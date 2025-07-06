import { useRef } from 'react';
import { Sparkline } from '@mantine/charts';
import {
  Avatar,
  Group,
  NumberFormatter,
  ScrollArea,
  Title
} from '@mantine/core';
import { useIsFetching } from '@tanstack/react-query';
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
        <DataTable.OrderableContext>
          <DataTable virtualized={{ scrollRef, rowHeight: 70 }}>
            <DataTable.Column
              columnKey="selection"
              sortable={false}
              resizable={false}
              orderable={false}
              defaultWidth="calc(20px + var(--data-table-horizontal-spacing) * 2)"
              headerProps={{ className: classes.sticky }}
              header={<DataTable.AllRowsSelector />}
              cellProps={{ className: classes.sticky }}
              cell={<DataTable.RowSelector />}
            />

            <DataTable.Column
              columnKey="avatarUrl"
              sortable={false}
              resizable={false}
              defaultWidth="calc(38px + var(--data-table-horizontal-spacing) * 2)"
              cell={({ value }) => <Avatar src={value} />}
            />

            <DataTable.Column columnKey="firstName" header="First Name" />

            <DataTable.Column columnKey="lastName" header="Last Name" />

            <DataTable.Column
              columnKey="birthday"
              header="Birthday"
              cell={({ value }) => value?.toLocaleDateString()}
            />

            <DataTable.Column columnKey="gender" header="Gender" />

            <DataTable.Column columnKey="job" header="Job Title" />

            <DataTable.Column
              columnKey="revenue"
              headerProps={{ ta: 'end' }}
              header="Revenue"
              cellProps={{ ta: 'end' }}
              cell={({ value }) => (
                <NumberFormatter
                  value={value}
                  prefix="$ "
                  thousandSeparator="."
                  decimalSeparator=","
                  fixedDecimalScale
                  decimalScale={2}
                  style={{ width: '100%' }}
                />
              )}
            />

            <DataTable.Column
              columnKey="trend"
              resizable={false}
              sortable={false}
              defaultWidth="calc(150px + var(--data-table-horizontal-spacing) * 2)"
              header="Trend"
              cell={({ value }) => (
                <Sparkline
                  w={150}
                  h={38}
                  data={value ?? []}
                  fillOpacity={0.2}
                  trendColors={{ positive: 'teal.6', negative: 'red.6' }}
                />
              )}
            />

            <DataTable.Column
              columnKey="actions"
              sortable={false}
              resizable={false}
              orderable={false}
              defaultWidth="calc(28px + var(--data-table-horizontal-spacing) * 2)"
              headerProps={{ className: classes.sticky, mod: 'right' }}
              cellProps={{ className: classes.sticky, mod: 'right' }}
              cell={
                <>
                  <DataTable.RestoreRowButton />
                  <DataTable.DeleteRowButton />
                </>
              }
            />
          </DataTable>
        </DataTable.OrderableContext>

        <LoadingOverlay />
      </ScrollArea>

      <DataTable.Pagination ml="auto" hideWithOnePage={false} />
    </div>
  );
};

const LoadingOverlay = () => {
  const isPending = useIsFetching({ queryKey: ['data'] });

  return <DataTable.DataState isPending={isPending === 1} />;
};
