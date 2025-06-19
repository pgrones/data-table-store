import { Group, Table, type TableThProps } from "@mantine/core";
import { ArrowsSort, ArrowUp } from "tabler-icons-react";
import type { DataTableEntity } from "../../dataTableStore/dataTableStore.types";
import { useDataTableSort } from "../../dataTableStore/hooks";
import { useDataTable } from "../dataTable.context";
import classes from "./sortableTh.module.css";

interface SortableThProps<TEntity extends DataTableEntity>
  extends TableThProps {
  columnKey: Extract<keyof TEntity, string>;
}

export const SortableTh = <TEntity extends DataTableEntity>({
  columnKey,
  children,
  ...props
}: SortableThProps<TEntity>) => {
  const dataTable = useDataTable<TEntity>();
  const { isSorted, desc } = useDataTableSort(columnKey);

  const rightAlign = props.ta === "end" || props.ta === "right";

  console.log("SortableTh");

  return (
    <Table.Th
      mod={{ sorted: isSorted, desc }}
      className={classes["sortable-header"]}
      onClick={() => dataTable.toggleSort(columnKey)}
      {...props}
    >
      <Group gap="xs" justify={rightAlign ? "flex-end" : "flex-start"}>
        {!rightAlign && children}

        {isSorted ? <ArrowUp /> : <ArrowsSort />}

        {rightAlign && children}
      </Group>
    </Table.Th>
  );
};
