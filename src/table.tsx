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

      <Table style={{ gridColumn: "span 2" }}>
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
          {/* <Table.Tr key={element.name}>
            <ToggleSelection />
            <Table.Td>{element.name}</Table.Td>
            <Table.Td>{element.symbol}</Table.Td>
            <Table.Td>{element.mass}</Table.Td>
          </Table.Tr> */}
        </Table.Tbody>
      </Table>

      <DataTable.Paging
        hideWithOnePage={false}
        style={{ gridColumn: 2, justifySelf: "flex-end" }}
      />
    </div>
  );
};
