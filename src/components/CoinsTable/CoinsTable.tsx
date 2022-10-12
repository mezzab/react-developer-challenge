import { MouseEvent, useEffect, useState } from 'react'

import { CurrencyState } from '../../context/currency'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { getCoinList } from '../../services/coinGecko'
import { CoinDetails } from '../../services/types'
import { SelectedCoinState } from '../../context/selectedCoin'
import EnhancedTable from '../shared/Table/Table'
import useMediaQuery from '../../hooks/useMediaQuery'
import {
  formatPercentage,
  formatNumberWithCurrencySymbol,
} from '../../helpers/formatters'

interface ColumnCell {
  disablePadding: boolean
  id: keyof CoinDetails
  label: string
  numeric: boolean
}

const MOBILE_DISABLED_COLUMNS_IDS = ['market_cap']

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
  const { currency } = CurrencyState()
  const { selectedCoin, setSelectedCoin } = SelectedCoinState()
  const [coins, setCoins] = useState<CoinDetails[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    fetchCoins()
  }, [currency])

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
  const filteredColumns = isDesktop
    ? columns
    : columns.filter((x) => !MOBILE_DISABLED_COLUMNS_IDS.includes(x.id))

  return (
    <EnhancedTable
      rows={coins}
      columns={filteredColumns}
      selectedCoin={selectedCoin.id}
      onRowClick={(row) => setSelectedCoin({ id: row.id, name: row.name })}
      rowsRenderer={(props: RowRendererProps) => (
        <RowRenderer {...props} isDesktop={isDesktop} currency={currency} />
      )}
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

interface ExtraProps {
  isDesktop: boolean
  currency: string
}

const RowRenderer = ({
  row,
  isItemSelected,
  handleClick,
  index,
  currency,
  isDesktop,
}: RowRendererProps & ExtraProps) => {
  const labelId = `enhanced-table-checkbox-${index}`

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
        {formatNumberWithCurrencySymbol(row.current_price, currency)}
      </TableCell>
      {isDesktop && (
        <TableCell align="right">
          {formatNumberWithCurrencySymbol(row.market_cap, currency, true)}
        </TableCell>
      )}
      <TableCell align="right">
        {formatPercentage(row.price_change_percentage_24h)}
      </TableCell>
    </TableRow>
  )
}
