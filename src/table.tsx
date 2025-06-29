import { useRef } from 'react';
import { Sparkline } from '@mantine/charts';
import {
  Avatar,
  Group,
  NumberFormatter,
  ScrollArea,
  Title
} from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import type { Customer } from './api';
import { createMantineThemedDataTable } from './mantineDataTable';
import classes from './table.module.css';

const DataTable = createMantineThemedDataTable<Customer>();

export const Table = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className={classes.layout}>
      <Group>
        <Title size="h2" mr="auto">
          Customers
        </Title>

        <Group>
          <DataTable.UndoButton />
          <DataTable.RedoButton />
          <DataTable.AddRowButton />
          <DataTable.SearchInput w={300} placeholder="Search Customers..." />
        </Group>
      </Group>

      <ScrollArea offsetScrollbars type="auto" viewportRef={scrollRef}>
        <DataTable
          stickyHeader
          horizontalSpacing="md"
          verticalSpacing="md"
          miw="max-content"
          w="auto"
        >
          <DataTable.Thead>
            <Headers />
          </DataTable.Thead>

          <DataTable.VirtualizedTbody
            scrollRef={scrollRef}
            rowHeight={64}
            overscan={5}
          >
            {rows}
          </DataTable.VirtualizedTbody>
        </DataTable>

        <LoadingOverlay />
      </ScrollArea>

      <DataTable.Pagination ml="auto" hideWithOnePage={false} />
    </div>
  );
};

const Headers = () => (
  <DataTable.Tr>
    <DataTable.Th
      columnId="selection"
      resizable={false}
      className={classes.sticky}
    >
      <DataTable.AllRowsSelector />
    </DataTable.Th>
    <DataTable.Th columnId="avatar" resizable={false} />
    <DataTable.Th sortableBy="firstName">First Name</DataTable.Th>
    <DataTable.Th sortableBy="lastName">Last Name</DataTable.Th>
    <DataTable.Th sortableBy="birthday">Birthday</DataTable.Th>
    <DataTable.Th sortableBy="gender">Gender</DataTable.Th>
    <DataTable.Th sortableBy="job">Job Title</DataTable.Th>
    <DataTable.Th sortableBy="revenue" ta="end">
      Revenue
    </DataTable.Th>
    <DataTable.Th resizable={false}>Trend</DataTable.Th>
    <DataTable.Th
      columnId="actions"
      resizable={false}
      className={classes.sticky}
      mod="right"
    />
  </DataTable.Tr>
);

const rows = (row: Customer) => (
  <DataTable.Tr h={64}>
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
      <DataTable.RestoreRowButton row={row} />
      <DataTable.DeleteRowButton row={row} />
    </DataTable.Td>
  </DataTable.Tr>
);

const LoadingOverlay = () => {
  const queryclient = useQueryClient();

  const isPending = queryclient.isFetching({ queryKey: 'data' });

  return <DataTable.DataState isPending={isPending === 1} />;
};
