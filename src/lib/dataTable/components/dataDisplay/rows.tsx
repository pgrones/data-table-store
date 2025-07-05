import { useDeferredValue } from 'react';
import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { typedMemo } from '../../dataTable.types';
import { useRowKeys } from '../../hooks';
import { useSelectedRows } from '../../hooks/useSelectedRows';
import { Row } from './row';

export interface RowsProps<TEntity extends object> {
  children: (row: Partial<TEntity>) => React.ReactNode;
}

export const createRows = <TEntity extends object>() =>
  typedMemo(({ children }: RowsProps<TEntity>) => {
    const rowKeys = useRowKeys();
    const deferredRowKeys = useDeferredValue(rowKeys);

    return (
      <div role="rowgroup" className="data-table-row-group">
        <TableRows rowKeys={deferredRowKeys} renderRow={children} />
      </div>
    );
  });

interface TableRowsProps<TEntity extends object> {
  rowKeys: RowKey[];
  renderRow: (row: Partial<TEntity>) => React.ReactNode;
}

const TableRows = typedMemo(
  <TEntity extends object>({ rowKeys, renderRow }: TableRowsProps<TEntity>) => {
    const selection = useSelectedRows();

    return rowKeys.map(rowKey => (
      <div
        key={rowKey}
        role="row"
        className="data-table-row"
        data-selected={selection.includes(rowKey)}
      >
        <Row rowKey={rowKey} renderRow={renderRow} />
      </div>
    ));
  }
);
