import { ActionIcon } from "@mantine/core";
import { useDataTable } from "../dataTable.context";
import { IconArrowBackUp } from "@tabler/icons-react";
import { useDataTableUndoState } from "../../dataTableStore/hooks";
import { useHotkeys } from "@mantine/hooks";

export const UndoButton = () => {
  const dataTable = useDataTable();
  const canUndo = useDataTableUndoState();

  useHotkeys([["mod+Z", dataTable.undo]]);

  return (
    <ActionIcon disabled={!canUndo} size="lg" onClick={dataTable.undo}>
      <IconArrowBackUp size={22} stroke={1.5} />
    </ActionIcon>
  );
};
