import { useDeferredValue } from 'react';
import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { typedMemo } from '../../dataTable.types';
import { useRowKeys } from '../../hooks';
import { Row } from './row';

export interface RowsProps<TEntity extends object>
  extends Omit<React.ComponentProps<'div'>, 'children'> {
  children: (row: TEntity) => React.ReactNode;
}

export const Rows = typedMemo(
  <TEntity extends object>({ children, ...props }: RowsProps<TEntity>) => {
    const rowKeys = useRowKeys();

    const deferredRowKeys = useDeferredValue(rowKeys);

    return (
      <div
        {...props}
        style={{ ...props.style, display: 'flex', flexWrap: 'nowrap' }}
      >
        <TableRows rowKeys={deferredRowKeys} renderRow={children} />
      </div>
    );
  }
);

interface TableRowsProps<TEntity extends object> {
  rowKeys: RowKey[];
  renderRow: (row: TEntity) => React.ReactNode;
}

const TableRows = typedMemo(
  <TEntity extends object>({ rowKeys, renderRow }: TableRowsProps<TEntity>) =>
    rowKeys.map(rowKey => (
      <Row key={rowKey} rowKey={rowKey} renderRow={renderRow} />
    ))
);
