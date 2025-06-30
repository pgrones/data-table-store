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
      <Group justify="space-between">
        <Title size="h2">Customers</Title>

        <Group>
          <DataTable.UndoButton />
          <DataTable.RedoButton />
          <DataTable.AddRowButton />
          <DataTable.SearchInput w={300} placeholder="Search Customers..." />
        </Group>
      </Group>

      <ScrollArea offsetScrollbars type="auto" viewportRef={scrollRef}>
        <DataTable>
          <DataTable.Column
            columnId="selection"
            sortable={false}
            resizable={false}
          >
            <DataTable.Header className={classes.sticky}>
              <DataTable.AllRowsSelector />
            </DataTable.Header>
            <DataTable.Cell>
              <DataTable.RowSelector />
            </DataTable.Cell>
          </DataTable.Column>

          <DataTable.Column
            columnId="avatarUrl"
            sortable={false}
            resizable={false}
          >
            <DataTable.Header />
            <DataTable.Cell>
              {({ value }) => <Avatar src={value as string} />}
            </DataTable.Cell>
          </DataTable.Column>

          <DataTable.Column columnId="firstName">
            <DataTable.Header>First Name</DataTable.Header>
            <DataTable.Cell>{({ value }) => value}</DataTable.Cell>
          </DataTable.Column>

          {/* <DataTable.VirtualizedRows
            scrollRef={scrollRef}
            rowHeight={64}
            overscan={5}
          >
            {rows}
          </DataTable.VirtualizedRows> */}

          {/* <DataTable
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
          </DataTable.VirtualizedTbody> */}
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
  <>
    <DataTable.Cell className={classes.sticky}>
      <DataTable.RowSelector row={row} />
    </DataTable.Cell>
    <DataTable.Cell>
      <Avatar src={row.avatarUrl} />
    </DataTable.Cell>
    <DataTable.Cell>{row.firstName}</DataTable.Cell>
    <DataTable.Cell>{row.lastName}</DataTable.Cell>
    <DataTable.Cell>{row.birthday?.toLocaleDateString()}</DataTable.Cell>
    <DataTable.Cell>{row.gender}</DataTable.Cell>
    <DataTable.Cell>{row.job}</DataTable.Cell>
    <DataTable.Cell ta="end">
      <NumberFormatter
        value={row.revenue}
        prefix="$ "
        thousandSeparator="."
        decimalSeparator=","
        fixedDecimalScale
        decimalScale={2}
      />
    </DataTable.Cell>
    <DataTable.Cell>
      <Sparkline
        w={150}
        h={38}
        data={row.trend}
        fillOpacity={0.2}
        trendColors={{ positive: 'teal.6', negative: 'red.6' }}
      />
    </DataTable.Cell>
    <DataTable.Cell className={classes.sticky} mod="right">
      <DataTable.RestoreRowButton row={row} />
      <DataTable.DeleteRowButton row={row} />
    </DataTable.Cell>
  </>
);

const LoadingOverlay = () => {
  const queryclient = useQueryClient();

  const isPending = queryclient.isFetching({ queryKey: 'data' });

  return <DataTable.DataState isPending={isPending === 1} />;
};
