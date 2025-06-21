import { Table } from "@mantine/core";
import { memo, useDeferredValue } from "react";
import type { RowKey } from "../../dataTableStore/dataTableStore.types";
import {
  useDataTableRowData,
  useDataTableRowKeys,
} from "../../dataTableStore/hooks";

export interface RowsProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
}

const Rows = <TEntity extends object>({
  children: renderRow,
}: RowsProps<TEntity>) => {
  const rowKeys = useDataTableRowKeys();
  const deferredRowKeys = useDeferredValue(rowKeys);

  return <MemoizedTableRows rowKeys={deferredRowKeys} children={renderRow} />;
};

export const MemoizedRows = memo(Rows, () => true) as unknown as typeof Rows;

interface TableRowsProps<TEntity extends object> extends RowsProps<TEntity> {
  rowKeys: RowKey[];
}

const TableRows = <TEntity extends object>({
  rowKeys,
  children,
}: TableRowsProps<TEntity>) => {
  console.count("Rows");

  return rowKeys.map((rowKey) => (
    <MemoizedTableRow key={rowKey} rowKey={rowKey} renderRow={children} />
  ));
};

const MemoizedTableRows = memo(TableRows) as unknown as typeof TableRows;

interface TableRowProps<TEntity extends object> {
  rowKey: RowKey;
  renderRow: (row: TEntity) => React.ReactNode;
}

const TableRow = <TEntity extends object>({
  rowKey,
  renderRow,
}: TableRowProps<TEntity>) => {
  const row = useDataTableRowData<TEntity>(rowKey);

  console.log("Row", rowKey);

  if (row === null)
    throw new Error(
      "Could not find a matching row in store with key " + rowKey
    );

  return <Table.Tr>{renderRow(row)}</Table.Tr>;
};

const MemoizedTableRow = memo(TableRow) as unknown as typeof TableRow;
