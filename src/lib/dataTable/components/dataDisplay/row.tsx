import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { useDataTable } from '../../dataTable.context';
import { typedMemo } from '../../dataTable.types';

interface RowProps<TEntity extends object> {
  rowKey: RowKey;
  renderRow: (row: TEntity) => React.ReactNode;
}

export const Row = typedMemo(
  <TEntity extends object>({ rowKey, renderRow }: RowProps<TEntity>) => {
    const row = useDataTable<TEntity, TEntity>(
      state =>
        state.data.find(x => state.getKey(x) === rowKey) ??
        (state.added as TEntity[]).find(x => state.getKey(x) === rowKey)!
    );

    return renderRow(row);
  }
);
