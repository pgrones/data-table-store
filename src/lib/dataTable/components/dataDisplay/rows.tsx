import { memo, useDeferredValue } from 'react';
import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { useDataTableRowData, useDataTableRowKeys } from '../../hooks';

export interface RowsProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
}

const RowsComponent = <TEntity extends object>({
  children: renderRow
}: RowsProps<TEntity>) => {
  const rowKeys = useDataTableRowKeys();
  const deferredRowKeys = useDeferredValue(rowKeys);

  return <MemoizedTableRows rowKeys={deferredRowKeys} children={renderRow} />;
};

export const Rows = memo(RowsComponent) as unknown as typeof RowsComponent;

interface TableRowsProps<TEntity extends object> extends RowsProps<TEntity> {
  rowKeys: RowKey[];
}

const TableRows = <TEntity extends object>({
  rowKeys,
  children
}: TableRowsProps<TEntity>) =>
  rowKeys.map(rowKey => (
    <MemoizedTableRow key={rowKey} rowKey={rowKey} renderRow={children} />
  ));

const MemoizedTableRows = memo(TableRows) as unknown as typeof TableRows;

interface TableRowProps<TEntity extends object> {
  rowKey: RowKey;
  renderRow: (row: TEntity) => React.ReactNode;
}

const TableRow = <TEntity extends object>({
  rowKey,
  renderRow
}: TableRowProps<TEntity>) => {
  const row = useDataTableRowData<TEntity>(rowKey);

  return renderRow(row);
};

const MemoizedTableRow = memo(TableRow) as unknown as typeof TableRow;
