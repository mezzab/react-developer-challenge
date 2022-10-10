import React, { useEffect, useState } from 'react'

import { CurrencyState } from '../../context/currency'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Paper from '@mui/material/Paper'
import { visuallyHidden } from '@mui/utils'
import { getCoinList } from '../../services/coinGecko'
import { CoinDetails } from '../../services/types'
import { CoinState } from '../../context/coin'

interface ColumnCell {
  disablePadding: boolean
  id: keyof CoinDetails
  label: string
  numeric: boolean
}

const columns: readonly ColumnCell[] = [
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
    label: 'Market Cap',
  },
]

function CoinList() {
  const [coins, setCoins] = useState<CoinDetails[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { currency } = CurrencyState()
  const { coin, setCoin } = CoinState()

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
      selectedCoin={coin}
      onRowClick={(row) => setCoin(row.id)}
    />
  )
}

export default CoinList

///////////////////////////////////////////////////////// Table //////////////////////////////////////////////////////////////

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

interface EnhancedTableHeadProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CoinDetails
  ) => void
  order: Order
  orderBy: string
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: keyof CoinDetails) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
      <TableRow>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

interface EnhancedTableProps {
  rows: CoinDetails[]
  onRowClick?: (row: CoinDetails) => void
  selectedCoin: string
}

function EnhancedTable({ rows, onRowClick, selectedCoin }: EnhancedTableProps) {
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<keyof CoinDetails>('market_cap')
  const [selected, setSelected] = useState<string>(selectedCoin)

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CoinDetails
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event: React.MouseEvent<unknown>, row: CoinDetails) => {
    setSelected(row.id)
    onRowClick && onRowClick(row)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 480 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {rows.sort(getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = row.id == selected
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
                    <TableCell align="right">{row.current_price}</TableCell>
                    <TableCell align="right">{row.market_cap}</TableCell>
                    <TableCell align="right">
                      {row.price_change_percentage_24h}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}
