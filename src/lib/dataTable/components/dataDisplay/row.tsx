import type { RowKey } from '../../../dataTableStore';
import { typedMemo } from '../../dataTable.types';
import { useRow } from '../../hooks';

interface RowProps<TEntity extends object> {
  rowKey: RowKey;
  renderRow: (row: TEntity) => React.ReactNode;
}

export const Row = typedMemo(
  <TEntity extends object>({ rowKey, renderRow }: RowProps<TEntity>) => {
    const row = useRow(rowKey) as TEntity;

    return renderRow(row);
  }
);
