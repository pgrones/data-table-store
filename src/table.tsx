import { useRef } from 'react';
import { Sparkline } from '@mantine/charts';
import {
  Avatar,
  Divider,
  Group,
  NumberFormatter,
  ScrollArea,
  Title
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
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
        <Title size="h2">Data Table Example</Title>

        <Group>
          <DataTable.HistoryButtons />
          <DataTable.AddRowButton />
          <Divider orientation="vertical" />
          <DataTable.SearchInput w={300} />
        </Group>
      </Group>

      <DataTable.OrderableContext>
        <ScrollArea offsetScrollbars type="auto" viewportRef={scrollRef}>
          <DataTable virtualized={{ scrollRef, rowHeight: 70 }}>
            <DataTable.Column
              static
              defaultWidth={20}
              columnKey="selection"
              headerProps={{ className: classes.sticky }}
              header={<DataTable.AllRowsSelector />}
              cellProps={{ className: classes.sticky }}
              cell={<DataTable.RowSelector />}
            />

            <DataTable.Column
              static
              defaultWidth={38}
              columnKey="avatarUrl"
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
              editable={false}
              defaultWidth={150}
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
              columnKey="alive"
              header="Alive"
              resizable={false}
              defaultWidth={70}
              cell={({ value }) =>
                value ? (
                  <IconCheck className={classes.icon} />
                ) : (
                  <IconX className={classes.icon} />
                )
              }
            />

            <DataTable.Column
              static
              defaultWidth={28}
              columnKey="actions"
              headerProps={{ className: classes.sticky, mod: 'right' }}
              cellProps={{ className: classes.sticky, mod: 'right' }}
              cell={
                <Group wrap="nowrap">
                  <DataTable.RestoreRowButton />
                  <DataTable.DeleteRowButton />
                </Group>
              }
            />
          </DataTable>

          <LoadingOverlay />
        </ScrollArea>
      </DataTable.OrderableContext>

      <Group justify="space-between">
        <DataTable.Totals />

        <DataTable.Pagination hideWithOnePage={false} />
      </Group>
    </div>
  );
};

const LoadingOverlay = () => {
  const isPending = useIsFetching({ queryKey: ['data'] });

  return <DataTable.DataState isPending={isPending === 1} />;
};
