import { Group, Table, type TableThProps } from "@mantine/core";
import { ArrowsSort, ArrowUp } from "tabler-icons-react";
import { useDataTableSort } from "../../dataTableStore/hooks";
import { useDataTable } from "../index";
import classes from "./sortableTh.module.css";

interface SortableThProps<TEntity extends object>
  extends Omit<TableThProps, "onClick"> {
  columnKey: Extract<keyof TEntity, string>;
}

export const SortableTh = <TEntity extends object>({
  columnKey,
  children,
  ...props
}: SortableThProps<TEntity>) => {
  const dataTable = useDataTable<TEntity>();
  const { isSorted, desc } = useDataTableSort(columnKey);

  const rightAlign = props.ta === "end" || props.ta === "right";

  console.count("SortableTh");

  return (
    <Table.Th
      {...props}
      mod={[
        { sorted: isSorted, desc },
        ...(Array.isArray(props.mod) ? props.mod : [props.mod]),
      ]}
      className={`${classes["sortable-header"]} ${props.className}`}
      onClick={() => dataTable.toggleSort(columnKey)}
    >
      <Group gap="xs" justify={rightAlign ? "flex-end" : "flex-start"}>
        {!rightAlign && children}

        {isSorted ? <ArrowUp /> : <ArrowsSort />}

        {rightAlign && children}
      </Group>
    </Table.Th>
  );
};
