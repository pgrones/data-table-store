import { ActionIcon } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";
import {
  useDataTableDeletedState,
  useDataTableEditedState,
} from "../../dataTableStore/hooks/useDataTableDataState";
import { useDataTable } from "../dataTable.context";

interface RestoreRowButtonProps<TEntity extends object> {
  row: TEntity;
}

export const RestoreRowButton = <TEntity extends object>({
  row,
}: RestoreRowButtonProps<TEntity>) => {
  const dataTable = useDataTable();
  const rowKey = dataTable.getKey(row);
  const isDeleted = useDataTableDeletedState(rowKey);
  const isEdited = useDataTableEditedState(rowKey);

  return (
    <ActionIcon
      variant="subtle"
      disabled={!isDeleted && !isEdited}
      onClick={() => dataTable.restoreRow(rowKey)}
    >
      <IconArrowBackUp size={18} stroke={1.5} />
    </ActionIcon>
  );
};
