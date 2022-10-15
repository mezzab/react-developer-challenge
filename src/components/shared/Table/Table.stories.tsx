import { TableCell, TableRow } from '@mui/material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { BasicItem } from '../../../services/types'

import Table, { RowRendererProps } from './Table'

export default {
  title: 'Example/Table',
  component: Table,
  argTypes: { onRowClick: { action: 'clicked' } },
} as ComponentMeta<typeof Table>

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />

const columns = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'lastName',
    numeric: false,
    disablePadding: false,
    label: 'Last Name',
  },
  {
    id: 'age',
    numeric: false,
    disablePadding: false,
    label: 'Age',
  },
]

const RowRenderer = ({
  row,
  isItemSelected,
  handleClick,
}: RowRendererProps<Person>) => {
  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row)}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell component="th" id={row.id} scope="row">
        {row.name}
      </TableCell>
      <TableCell>{row.lastName}</TableCell>
      <TableCell>{row.age}</TableCell>
    </TableRow>
  )
}

interface Person extends BasicItem {
  lastName: string
  age: number
}

export const Primary = Template.bind({})
Primary.args = {
  rows: [
    { name: 'Marcos', lastName: 'Mezzabotta', age: 28, id: 'fakeId1' },
    { name: 'Pedro', lastName: 'Picapiedra', age: 38, id: 'fakeId2' },
  ] as Person[],
  rowsRenderer: (p: any) => <RowRenderer {...p} />,
  columns,
  defaultOrderBy: 'fakeId1',
  error: false,
  loading: false,
}
