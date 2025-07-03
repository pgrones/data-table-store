import type { RowKey } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';

export const useRow = <TEntity extends object>(rowKey: RowKey) =>
  useDataTable<TEntity, Partial<TEntity> | undefined>(
    state =>
      state.data.find(x => state.getKey(x) === rowKey) ??
      state.added.find(x => state.getKey(x) === rowKey)
  );
