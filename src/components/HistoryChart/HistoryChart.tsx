import { ReactElement, useEffect, useState } from 'react'
import { VictoryChart, VictoryAxis, VictoryTheme, VictoryLine } from 'victory'
import { getCoinHistory } from '../../services/coinGecko'
import { CurrencyState } from '../../context/currency'
import { formatChartData } from '../../helpers/formatChartData'
import { CoinHistory, Error } from '../../services/types'
import { CoinState } from '../../context/coin'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

import { ChartWindows } from '../../config/config'
import { Paper } from '@mui/material'

export default function HistoryChart(): ReactElement | null {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null) // todo: type this.
  const { currency } = CurrencyState()
  const [days, setDays] = useState('30')
  const [coinHistory, setCoinHistory] = useState<CoinHistory | null>(null)
  const { coin } = CoinState()

  useEffect(() => {
    fetchCoinHistory()
  }, [days, coin])

  const fetchCoinHistory = async () => {
    setLoading(true)
    const res = await getCoinHistory(coin, currency, days)

    if (res.success) {
      setCoinHistory(res.value)
    } else {
      setError(res.error)
    }
    setLoading(false)
  }

  if (!coinHistory) return null // todo: loading

  const coinPrices = formatChartData(coinHistory?.prices)

  const timeFormatting = (timestamp: number): string | number => {
    return new Date(timestamp).toLocaleDateString()
  }

  return (
    <Paper sx={{ width: '100%', mb: 2, textAlign: 'center', padding: '0.5em' }}>
      <Box>
        <ButtonGroup variant="contained" aria-label="primary button group">
          {ChartWindows.map((x, i) => {
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
          tickFormat={timeFormatting}
        />
        <VictoryAxis
          style={{
            axis: { stroke: 'grey', strokeWidth: 2 },
            ticks: { stroke: 'black' },
            tickLabels: { fontSize: 5 },
          }}
          dependentAxis
          orientation="left"
          // tickFormat={(x) => `${currencyFormatting.format(x)}`}
          label=""
          standalone={true}
        />
        <VictoryLine
          style={{
            data: {
              stroke: '#1976d2',
              strokeWidth: 0.5,
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
