import { Group } from '@mantine/core';
import type { User } from './app';
import { createMantineThemedDataTable } from './mantineDataTable';
import classes from './table.module.css';
import { useCallback } from 'react';

const DataTable = createMantineThemedDataTable<User>();

export const EditableTable = () => {
  const rows = useCallback(
    (row: User) => (
      <DataTable.Tr>
        <DataTable.Td className={classes.sticky}>
          <Group>
            <DataTable.RowSelector row={row} />
            <DataTable.DeleteRowButton row={row} />
            <DataTable.RestoreRowButton row={row} />
          </Group>
        </DataTable.Td>
        <DataTable.Td>{row.id}</DataTable.Td>
        <DataTable.Td>{row.firstName}</DataTable.Td>
        <DataTable.Td>{row.lastName}</DataTable.Td>
        <DataTable.Td>{row.birthday?.toLocaleDateString()}</DataTable.Td>
      </DataTable.Tr>
    ),
    []
  );

  return (
    <div className={classes.layout}>
      <Group style={{ gridColumn: 2 }} justify="flex-end">
        <DataTable.UndoButton />

        <DataTable.AddRowButton />

        <DataTable.SearchInput w={250} placeholder="Search..." />
      </Group>

      <DataTable.ScrollContainer
        minWidth={1000}
        style={{ gridColumn: 'span 2' }}
      >
        <DataTable stickyHeader>
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTable.Th className={classes.sticky}>
                <DataTable.AllRowsSelector />
              </DataTable.Th>
              <DataTable.SortableTh columnKey="id">ID</DataTable.SortableTh>
              <DataTable.SortableTh columnKey="firstName">
                First Name
              </DataTable.SortableTh>
              <DataTable.SortableTh columnKey="lastName">
                Last Name
              </DataTable.SortableTh>
              <DataTable.SortableTh columnKey="birthday">
                Birthday
              </DataTable.SortableTh>
            </DataTable.Tr>
          </DataTable.Thead>

          <DataTable.Tbody>
            <DataTable.Rows>{rows}</DataTable.Rows>
          </DataTable.Tbody>
        </DataTable>

        <DataTable.DataState />
      </DataTable.ScrollContainer>

      <DataTable.Pagination
        hideWithOnePage={false}
        style={{ gridColumn: 2, justifySelf: 'flex-end' }}
      />
    </div>
  );
};
