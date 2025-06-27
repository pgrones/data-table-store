import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { useDataTableRowData } from '../../hooks';
import { typedMemo } from '../polymorphism/memoWithGenerics';

interface RowProps<TEntity extends object> {
  rowKey: RowKey;
  renderRow: (row: TEntity) => React.ReactNode;
}

export const Row = typedMemo(
  <TEntity extends object>({ rowKey, renderRow }: RowProps<TEntity>) => {
    const row = useDataTableRowData<TEntity>(rowKey);

    return renderRow(row);
  }
);
