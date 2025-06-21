import { ActionIcon } from "@mantine/core";
import { useDataTable } from "../dataTable.context";
import { IconTrash } from "@tabler/icons-react";
import { useDataTableDeletedState } from "../../dataTableStore/hooks/useDataTableDataState";

interface DeleteRowButtonProps<TEntity extends object> {
  row: TEntity;
}

export const DeleteRowButton = <TEntity extends object>({
  row,
}: DeleteRowButtonProps<TEntity>) => {
  const dataTable = useDataTable();
  const rowKey = dataTable.getKey(row);
  const isDeleted = useDataTableDeletedState(rowKey);

  return (
    <ActionIcon
      variant="subtle"
      color="red"
      disabled={isDeleted}
      onClick={() => dataTable.deleteRow(rowKey)}
    >
      <IconTrash size={18} stroke={1.5} />
    </ActionIcon>
  );
};
