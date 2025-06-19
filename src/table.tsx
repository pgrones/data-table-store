import { Table } from "@mantine/core";
import classes from "./table.module.css";
import { createDataTableFor } from "./lib";
import type { User } from "./app";

const DataTable = createDataTableFor<User>();

export const EditableTable = () => {
  return (
    <div className={classes.layout}>
      <DataTable.Search
        style={{ gridColumn: 2 }}
        w={250}
        placeholder="Search..."
      />

      <Table.ScrollContainer minWidth="1000" style={{ gridColumn: "span 2" }}>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <DataTable.ToggleSelectionAll />
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
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            <DataTable.Rows>
              {(row) => (
                <>
                  <DataTable.ToggleSelection row={row} />
                  <Table.Td>{row.id}</Table.Td>
                  <Table.Td>{row.firstName}</Table.Td>
                  <Table.Td>{row.lastName}</Table.Td>
                  <Table.Td>{row.birthday.toLocaleDateString()}</Table.Td>
                </>
              )}
            </DataTable.Rows>
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <DataTable.Paging
        hideWithOnePage={false}
        style={{ gridColumn: 2, justifySelf: "flex-end" }}
      />
    </div>
  );
};
