import { Group } from "@mantine/core";
import type { User } from "./app";
import { createDataTableFor } from "./lib";
import classes from "./table.module.css";

const DataTable = createDataTableFor<User>();

export const EditableTable = () => {
  return (
    <div className={classes.layout}>
      <Group style={{ gridColumn: 2 }} justify="flex-end">
        <DataTable.UndoButton />

        <DataTable.AddRowButton />

        <DataTable.Search w={250} placeholder="Search..." />
      </Group>

      <DataTable.ScrollContainer
        minWidth={1000}
        style={{ gridColumn: "span 2" }}
      >
        <DataTable stickyHeader>
          <DataTable.Thead>
            <DataTable.Tr>
              <DataTable.Th className={classes.sticky}>
                <DataTable.ToggleSelectionAll />
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
            <DataTable.Rows>
              {(row) => (
                <>
                  <DataTable.Td className={classes.sticky}>
                    <Group>
                      <DataTable.ToggleSelection row={row} />
                      <DataTable.DeleteRowButton row={row} />
                      <DataTable.RestoreRowButton row={row} />
                    </Group>
                  </DataTable.Td>
                  <DataTable.Td>{row.id}</DataTable.Td>
                  <DataTable.Td>{row.firstName}</DataTable.Td>
                  <DataTable.Td>{row.lastName}</DataTable.Td>
                  <DataTable.Td>
                    {row.birthday?.toLocaleDateString()}
                  </DataTable.Td>
                </>
              )}
            </DataTable.Rows>
          </DataTable.Tbody>
        </DataTable>

        <DataTable.DataStateOverlay />
      </DataTable.ScrollContainer>

      <DataTable.Paging
        hideWithOnePage={false}
        style={{ gridColumn: 2, justifySelf: "flex-end" }}
      />
    </div>
  );
};
