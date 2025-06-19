import { Table, Checkbox } from "@mantine/core";
import {
  useDataTableSelectionAll,
  useDataTableSelection,
} from "../../dataTableStore/hooks";
import type { DataTableEntity } from "../../dataTableStore/dataTableStore.types";
import { useDataTable } from "../dataTable.context";

export const ToggleSelectionAll = () => {
  const dataTable = useDataTable();
  const { isSelected, indeterminate } = useDataTableSelectionAll();

  console.log("ToggleSelectionAll");

  return (
    <Table.Th>
      <Checkbox
        checked={isSelected}
        onChange={dataTable.toggleAllRowSelections}
        indeterminate={indeterminate}
      />
    </Table.Th>
  );
};

export const ToggleSelection = ({ row }: { row: DataTableEntity }) => {
  const dataTable = useDataTable();
  const isSelected = useDataTableSelection(row);

  console.log("ToggleSelection");

  return (
    <Table.Td>
      <Checkbox
        checked={isSelected}
        onChange={() => dataTable.toggleRowSelection(row)}
      />
    </Table.Td>
  );
};
