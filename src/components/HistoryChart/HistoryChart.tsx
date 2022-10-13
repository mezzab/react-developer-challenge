import { ReactElement, useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory'

import { ChartDaysOptions } from '../../config/config'
import { CurrencyState } from '../../context/currency'
import { SelectedCoinState } from '../../context/selectedCoin'
import {
  formatChartData,
  formatNumberWithCurrencySymbol,
  formatTime,
} from '../../helpers/formatters'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useRequestStatus } from '../../hooks/useRequestStatus'
import { getCoinHistory } from '../../services/coinGecko'
import { CoinHistory } from '../../services/types'
import ErrorMessage from '../shared/ErrorMessage/ErrorMessage'
import LoadingIndicator from '../shared/LoadingIndicator/LoadingIndicator'
import MenuButton from '../shared/MenuButton/MenuButton'

import './HistoryChart.css'

export default function HistoryChart(): ReactElement | null {
  const { setStatusLoading, setStatusError, setStatusSuccess, loading, error } =
    useRequestStatus()
  const { currency } = CurrencyState()
  const [days, setDays] = useState('30')
  const [coinHistory, setCoinHistory] = useState<CoinHistory | null>(null)
  const { selectedCoin } = SelectedCoinState()

  useEffect(() => {
    fetchCoinHistory()
  }, [days, selectedCoin])

  const fetchCoinHistory = async () => {
    setStatusLoading()
    const res = await getCoinHistory(selectedCoin.id, currency, days)

    if (res.success) {
      setStatusSuccess()
      //todo(improv): we should probably store this data in order to avoid making a request every time
      setCoinHistory(res.value)
    } else {
      setStatusError(res.error)
    }
  }

  if (error || !coinHistory) {
    return <ErrorMessage error={error} />
  }

  const coinPrices = formatChartData(coinHistory?.prices)

  return (
    <Paper
      sx={{ width: '100%', mb: 2, textAlign: 'center' }}
      aria-busy={loading}
    >
      <Box
        sx={{
          padding: '2em',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className="coinNameWrapper">
          <div className="selectedCoin"> {selectedCoin.name} </div>
          <LoadingIndicator loading={loading} />
        </div>
        <ChartDaysOptionsRender days={days} setDays={setDays} />
      </Box>

      <VictoryChart
        height={150}
        width={300}
        padding={{ top: 20, bottom: 35, left: 40, right: 20 }}
        domainPadding={5}
        animate={{
          duration: 1000,
          onLoad: { duration: 500 },
        }}
      >
        <VictoryAxis
          style={{
            axis: { stroke: 'grey', strokeWidth: 2 },
            ticks: { stroke: 'black' },
            tickLabels: { fontSize: 6 },
          }}
          orientation="bottom"
          tickFormat={formatTime}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'grey', strokeWidth: 2 },
            ticks: { stroke: 'black' },
            tickLabels: { fontSize: 5 },
          }}
          dependentAxis
          orientation="left"
          tickFormat={(x) => `${formatNumberWithCurrencySymbol(x, currency)}`}
          label=""
          standalone={true}
        />
        <VictoryLine
          style={{
            data: {
              stroke: '#1976d2',
              strokeWidth: 0.2,
            },
            labels: { fontSize: 6 },
            parent: { border: '1px solid #ccc' },
          }}
          data={coinPrices}
          x="timestamp"
          y="price"
        />
      </VictoryChart>
    </Paper>
  )
}

const ChartDaysOptionsRender = ({ setDays, days }: any) => {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <ButtonGroup variant="contained" aria-label="primary button group">
        {ChartDaysOptions.map((x, i) => {
          const selected = x.value === days
          return (
            <Button
              key={i}
              aria-selected={selected}
              color={selected ? 'primary' : 'inherit'}
              onClick={() => setDays(x.value)}
            >
              {x.label}
            </Button>
          )
        })}
      </ButtonGroup>
    )
  } else {
    const onSelect = (o: string) => {
      setDays(ChartDaysOptions.find((x) => x.label === o)!.value)
    }

    const selected = ChartDaysOptions.find((x) => x.value === days)!.label
    return (
      <MenuButton
        // todo(improv): allow MenuButton to receive different types of `options`
        options={ChartDaysOptions.map((x) => x.label)}
        onSelect={onSelect}
        selected={selected}
      />
    )
  }
}
