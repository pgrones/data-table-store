import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { DataTableStore } from '../../dataTableStore/dataTableStore';
import type { DataTableParams } from '../../dataTableStore/dataTableStore.types';

export const useDataTableParams = <TEntity extends object>(
  store: DataTableStore<TEntity>
): DataTableParams<TEntity> =>
  useStore(
    store,
    useShallow(state => ({
      currentPage: state.currentPage,
      pageSize: state.pageSize,
      searchValue: state.searchValue,
      sortBy: state.sortBy,
      descending: state.descending
    }))
  );
