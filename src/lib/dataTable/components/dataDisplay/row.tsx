import { useRef } from 'react';
import type { RowKey } from '../../../dataTableStore';
import { typedMemo } from '../../dataTable.types';
import { useRow } from '../../hooks';
import { RowContext } from './row.context';

interface RowProps<TEntity extends object> {
  rowKey: RowKey;
  renderRow: (row: Partial<TEntity>) => React.ReactNode;
}

export const Row = typedMemo(
  <TEntity extends object>({ rowKey, renderRow }: RowProps<TEntity>) => {
    const cache = useRef<Partial<TEntity>>({});

    const row = useRow(rowKey);

    if (row) cache.current = row;

    return (
      <RowContext value={{ rowKey }}>{renderRow(cache.current)}</RowContext>
    );
  }
);
