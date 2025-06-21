import { ActionIcon } from "@mantine/core";
import { IconTablePlus } from "@tabler/icons-react";
import { useDataTable } from "../dataTable.context";

export const AddRowButton = () => {
  const dataTable = useDataTable();

  return (
    <ActionIcon size="lg" onClick={dataTable.addRow}>
      <IconTablePlus size={22} stroke={1.5} />
    </ActionIcon>
  );
};
