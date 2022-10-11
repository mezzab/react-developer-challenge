import { MouseEvent, useState } from 'react'

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
import './Table.css'

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

function getComparator(
  order: Order,
  orderBy: string
): (a: { [key: string]: any }, b: { [key: string]: any }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

interface ColumnCell {
  disablePadding: boolean
  id: string
  label: string
  numeric: boolean
}

interface EnhancedTableHeadProps<T> {
  onRequestSort: (event: MouseEvent<unknown>, property: string) => void
  order: Order
  orderBy: string
  columns: ColumnCell[]
}
interface BasicItem {
  id: string
}

const EnhancedTableHead = <T extends BasicItem>(
  props: EnhancedTableHeadProps<T>
) => {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler =
    (property: string) => (event: MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
      <TableRow>
        {props.columns.map((headCell, i) => (
          <TableCell
            key={i}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              sx={{ fontWeight: 'bold' }}
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

interface EnhancedTableProps<T> {
  rows: T[]
  rowsRenderer: ({
    row,
    isItemSelected,
    handleClick,
    index,
  }: {
    row: T
    isItemSelected: boolean
    handleClick: (e: MouseEvent<unknown>, row: T) => void
    index: number
  }) => JSX.Element
  onRowClick?: (row: T) => void
  selectedCoin: string
  columns: ColumnCell[]
  defaultOrderBy: string
}

const EnhancedTable = <T extends BasicItem>({
  rows,
  onRowClick,
  selectedCoin,
  columns,
  rowsRenderer,
  defaultOrderBy,
}: EnhancedTableProps<T>) => {
  const [order, setOrder] = useState<Order>('desc')
  const [orderBy, setOrderBy] = useState<string>(defaultOrderBy)
  const [selected, setSelected] = useState<string>(selectedCoin)

  const handleRequestSort = (event: MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleClick = (event: MouseEvent<unknown>, row: T) => {
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
              columns={columns}
            />
            <TableBody>
              {rows.sort(getComparator(order, orderBy)).map((row, index) => {
                const isItemSelected = row.id == selected
                return rowsRenderer({
                  row,
                  isItemSelected,
                  handleClick,
                  index,
                })
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  )
}

export default EnhancedTable
