import {
  Avatar,
  Group,
  NumberFormatter,
  ScrollArea,
  Title
} from '@mantine/core';
import type { Customer } from './api';
import { createMantineThemedDataTable } from './mantineDataTable';
import classes from './table.module.css';
import { useCallback } from 'react';
import { Sparkline } from '@mantine/charts';

const DataTable = createMantineThemedDataTable<Customer>();

export const Table = () => {
  const rows = useCallback(
    (row: Customer) => (
      <DataTable.Tr>
        <DataTable.Td className={classes.sticky}>
          <DataTable.RowSelector row={row} />
        </DataTable.Td>
        <DataTable.Td>
          <Avatar src={row.avatarUrl} />
        </DataTable.Td>
        <DataTable.Td>{row.firstName}</DataTable.Td>
        <DataTable.Td>{row.lastName}</DataTable.Td>
        <DataTable.Td>{row.birthday?.toLocaleDateString()}</DataTable.Td>
        <DataTable.Td>{row.gender}</DataTable.Td>
        <DataTable.Td>{row.job}</DataTable.Td>
        <DataTable.Td ta="end">
          <NumberFormatter
            value={row.revenue}
            prefix="$ "
            thousandSeparator="."
            decimalSeparator=","
            fixedDecimalScale
            decimalScale={2}
          />
        </DataTable.Td>
        <DataTable.Td>
          <Sparkline
            w={150}
            h={38}
            data={row.trend}
            trendColors={{
              positive: 'teal.6',
              negative: 'red.6',
              neutral: 'gray.5'
            }}
            fillOpacity={0.2}
          />
        </DataTable.Td>
        <DataTable.Td className={classes.sticky} mod="right">
          <Group gap="xs" justify="flex-end">
            <DataTable.RestoreRowButton row={row} />
            <DataTable.DeleteRowButton row={row} />
          </Group>
        </DataTable.Td>
      </DataTable.Tr>
    ),
    []
  );

  return (
    <div className={classes.layout}>
      <Group>
        <Title size="h2" mr="auto">
          Customers
        </Title>

        <Group>
          <DataTable.UndoButton />
          <DataTable.AddRowButton />
          <DataTable.SearchInput w={300} placeholder="Search Customers..." />
        </Group>
      </Group>

      <ScrollArea offsetScrollbars type="auto">
        <DataTable stickyHeader horizontalSpacing="lg" verticalSpacing="sm">
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTable.Th className={classes.sticky}>
                <DataTable.AllRowsSelector />
              </DataTable.Th>
              <DataTable.Th />
              <DataTable.SortableTh columnKey="firstName">
                First Name
              </DataTable.SortableTh>
              <DataTable.SortableTh columnKey="lastName">
                Last Name
              </DataTable.SortableTh>
              <DataTable.SortableTh columnKey="birthday">
                Birthday
              </DataTable.SortableTh>
              <DataTable.SortableTh columnKey="gender">
                Gender
              </DataTable.SortableTh>
              <DataTable.SortableTh columnKey="job">
                Job Title
              </DataTable.SortableTh>
              <DataTable.SortableTh columnKey="revenue" ta="end">
                Revenue
              </DataTable.SortableTh>
              <DataTable.Th>Trend</DataTable.Th>
              <DataTable.Th className={classes.sticky} mod="right" />
            </DataTable.Tr>
          </DataTable.Thead>

          <DataTable.Tbody>
            <DataTable.Rows>{rows}</DataTable.Rows>
          </DataTable.Tbody>

          <DataTable.Colgroup>
            <DataTable.Col width={20} />
            <DataTable.Col width={38} />
            <DataTable.Col />
            <DataTable.Col />
            <DataTable.Col />
            <DataTable.Col />
            <DataTable.Col />
            <DataTable.Col />
            <DataTable.Col />
            <DataTable.Col width={28} />
          </DataTable.Colgroup>
        </DataTable>

        <DataTable.DataState />
      </ScrollArea>

      <DataTable.Pagination ml="auto" hideWithOnePage={false} />
    </div>
  );
};
