import { Table } from "@mantine/core";
import { memo, useDeferredValue } from "react";
import { useDataTableData, type Data } from "../../dataTableStore/hooks";
import classes from "./rows.module.css";

interface RowsProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
}

export const Rows = <TEntity extends object>({
  children,
}: RowsProps<TEntity>) => {
  const data = useDataTableData<TEntity>();
  const deferredData = useDeferredValue(data);

  return <MemoizedTableRows data={deferredData} children={children} />;
};

interface TableRowsProps<TEntity extends object> extends RowsProps<TEntity> {
  data: Data<TEntity>;
}

const TableRows = <TEntity extends object>({
  data,
  children,
}: TableRowsProps<TEntity>) => {
  console.count("Rows");

  return data.map(({ key, ...row }) => (
    <Table.Tr key={key} className={classes.stale}>
      {children(row as TEntity)}
    </Table.Tr>
  ));
};

const MemoizedTableRows = memo(TableRows) as unknown as typeof TableRows;
