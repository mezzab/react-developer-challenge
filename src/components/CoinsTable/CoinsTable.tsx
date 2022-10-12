import { MouseEvent, useEffect, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { CurrencyState } from '../../context/currency'
import { SelectedCoinState } from '../../context/selectedCoin'
import {
  formatNumberWithCurrencySymbol,
  formatPercentage,
} from '../../helpers/formatters'
import useMediaQuery from '../../hooks/useMediaQuery'
import { useRequestStatus } from '../../hooks/useRequestStatus'
import { getCoinList } from '../../services/coinGecko'
import { CoinDetails } from '../../services/types'
import EnhancedTable from '../shared/Table/Table'

interface ColumnCell {
  disablePadding: boolean
  id: keyof CoinDetails
  label: string
  numeric: boolean
}

const MOBILE_DISABLED_COLUMNS_IDS = [
  'market_cap',
  'price_change_percentage_24h',
]

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
  const { setStatusLoading, setStatusError, setStatusSuccess, loading, error } =
    useRequestStatus()
  const isDesktop = useMediaQuery('(min-width: 768px)')

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const fetchCoins = async () => {
    setStatusLoading()
    const res = await getCoinList(currency)

    if (res.success) {
      setStatusSuccess()
      setCoins(res.value)
    } else {
      setStatusError(res.error)
    }
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
      rowsRenderer={(props: RowRendererProps<CoinDetails>) => (
        <RowRenderer {...props} isDesktop={isDesktop} currency={currency} />
      )}
      defaultOrderBy={'market_cap'}
      error={error}
      loading={loading}
    />
  )
}

export default CoinList

interface RowRendererProps<T> {
  row: T
  isItemSelected: boolean
  handleClick: (e: MouseEvent<unknown>, r: T) => void
  index: number
}

interface ExtraProps {
  isDesktop: boolean
  currency: string
}

const RowRenderer = <T extends CoinDetails>({
  row,
  isItemSelected,
  handleClick,
  index,
  currency,
  isDesktop,
}: RowRendererProps<T> & ExtraProps) => {
  const labelId = `enhanced-table-checkbox-${index}`

  const perc24hsChange = formatPercentage(row.price_change_percentage_24h)
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
        {!isDesktop && perc24hsChange}
      </TableCell>
      {isDesktop && (
        <TableCell align="right">
          {formatNumberWithCurrencySymbol(row.market_cap, currency, true)}
        </TableCell>
      )}
      {isDesktop && <TableCell align="right">{perc24hsChange}</TableCell>}
    </TableRow>
  )
}
