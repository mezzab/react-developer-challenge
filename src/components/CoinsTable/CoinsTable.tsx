import { MouseEvent, useEffect, useState } from 'react'

import { CurrencyState } from '../../context/currency'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { getCoinList } from '../../services/coinGecko'
import { CoinDetails } from '../../services/types'
import { SelectedCoinState } from '../../context/selectedCoin'
import EnhancedTable from '../shared/Table/Table'

interface ColumnCell {
  disablePadding: boolean
  id: keyof CoinDetails
  label: string
  numeric: boolean
}

const columns: ColumnCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'current_price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'market_cap',
    numeric: true,
    disablePadding: false,
    label: 'Market Cap',
  },
  {
    id: 'price_change_percentage_24h',
    numeric: true,
    disablePadding: false,
    label: '24h change',
  },
]

function CoinList() {
  const [coins, setCoins] = useState<CoinDetails[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { currency } = CurrencyState()
  const { selectedCoin, setSelectedCoin } = SelectedCoinState()

  const fetchCoins = async () => {
    setLoading(true)
    const res = await getCoinList(currency)

    if (res.success) {
      setCoins(res.value)
    } else {
      // todo
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCoins()
  }, [currency])

  return (
    <EnhancedTable
      rows={coins}
      columns={columns}
      selectedCoin={selectedCoin.id}
      onRowClick={(row) => setSelectedCoin({ id: row.id, name: row.name })}
      rowsRenderer={RowRenderer}
      defaultOrderBy={'market_cap'}
    />
  )
}

export default CoinList

interface RowRendererProps {
  row: CoinDetails
  isItemSelected: boolean
  handleClick: (e: MouseEvent<unknown>, r: CoinDetails) => void
  index: number
}

const RowRenderer = ({
  row,
  isItemSelected,
  handleClick,
  index,
}: RowRendererProps) => {
  const labelId = `enhanced-table-checkbox-${index}`

  const { currency } = CurrencyState()

  const formatNumberWithCurrencySymbol = (
    number: number,
    noFractionDigits: boolean = false
  ) => {
    /* todo: create a language context similar to currency.tsx */
    const fractionDigits = noFractionDigits ? 0 : undefined
    return number.toLocaleString('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    })
  }

  const formatPercentageNumber = (number: number) => {
    const fixedNumber = number.toFixed(2)
    return (
      <div className={number < 0 ? 'negative' : 'positive'}>{fixedNumber}%</div>
    )
  }

  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row)}
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell component="th" id={labelId} scope="row">
        {row.name}
      </TableCell>
      <TableCell align="right">
        {formatNumberWithCurrencySymbol(row.current_price)}
      </TableCell>
      <TableCell align="right">
        {formatNumberWithCurrencySymbol(row.market_cap, true)}
      </TableCell>
      <TableCell align="right">
        {formatPercentageNumber(row.price_change_percentage_24h)}
      </TableCell>
    </TableRow>
  )
}
