import { Button, Checkbox, Table } from "@mantine/core";
import { useLogger } from "@mantine/hooks";
import type { User } from "./app";
import {
  useDataTable,
  useDataTableCell,
  useDataTableRows,
  useDataTableSelection,
} from "./data-table/dataTableStore.hooks";
import type { RowKey } from "./data-table/dataTableStore.types";

export const DataTable = () => {
  const dataTable = useDataTable();

  useLogger("Rerender table", []);

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>
            <Button onClick={dataTable.toggleAllRowSelections} />
          </Table.Th>
          <Table.Th>Id</Table.Th>
          <Table.Th>Name</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Rows />
    </Table>
  );
};

const Rows = () => {
  const { columns, rowKeys } = useDataTableRows<User>();

  useLogger("Rerender rows", [columns, rowKeys]);

  return (
    <Table.Tbody>
      {rowKeys.map((rowKey, index) => (
        <Table.Tr key={rowKey}>
          <Table.Td>
            <Check rowKey={rowKey} />
          </Table.Td>
          {columns.map((column) => (
            <Cell key={rowKey + column} columnName={column} rowIndex={index} />
          ))}
        </Table.Tr>
      ))}
    </Table.Tbody>
  );
};

const Check = ({ rowKey }: { rowKey: RowKey }) => {
  const dataTable = useDataTable();
  const isSelected = useDataTableSelection(rowKey);

  useLogger("Rerender check", [isSelected]);

  return (
    <Checkbox
      checked={isSelected}
      onChange={() => dataTable.toggleRowSelection(rowKey)}
    />
  );
};

const Cell = ({
  columnName,
  rowIndex,
}: {
  columnName: keyof User;
  rowIndex: number;
}) => {
  const value = useDataTableCell(columnName, rowIndex);

  useLogger("Rerender cell", [value]);

  return <Table.Td>{value}</Table.Td>;
};
