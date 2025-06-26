import { useDataTable } from '..';
import type { DataTableStore } from '../../dataTableStore/dataTableStore';
import type { RowKey } from '../../dataTableStore/dataTableStore.types';
import { useSelector } from '../../store/store.hooks';
import { createDataTableSelector } from './selector';

export const useDataTableRowData = <TEntity extends object>(rowKey: RowKey) => {
  const store = useDataTable<TEntity>();

  const state = store.getSnapshot();

  return (state.data.find(x => store.getKey(x) === rowKey) ??
    state.editing.added.find(x => store.getKey(x) === rowKey)!) as TEntity;
};

const rowKeysSelector = createDataTableSelector(
  [
    state => state.data,
    state => state.editing.added,
    (_, store: DataTableStore) => store
  ],
  (data, added, store) => [
    ...added.map(x => store.getKey(x)),
    ...data.map(x => store.getKey(x))
  ],
  {
    memoizeOptions: {
      maxSize: 1
    }
  }
);

export const useDataTableRowKeys = <TEntity extends object>() => {
  const store = useDataTable<TEntity>();

  return useSelector(store, rowKeysSelector, store) as RowKey[];
};
