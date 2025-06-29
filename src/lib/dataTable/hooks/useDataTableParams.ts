import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { DataTableStore } from '../../dataTableStore/dataTableStore';
import type { DataTableParams } from '../../dataTableStore/dataTableStore.types';

export const useDataTableParams = <TEntity extends object>(
  store: DataTableStore<TEntity>
): DataTableParams<TEntity> =>
  useStore(
    store,
    useShallow(state => {
      const sortedColumn = [...state.columns.entries()].find(
        ([_, value]) => value.isSorted
      );

      return {
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        searchValue: state.searchValue,
        sortBy: sortedColumn ? (sortedColumn[0] as never) : null,
        descending: sortedColumn?.[1]?.descending ?? false
      };
    })
  );
