import { useSelector } from '../../store/store.hooks';
import type { DataTableStore } from '../../dataTableStore/dataTableStore';
import type { DataTableParams } from '../../dataTableStore/dataTableStore.types';
import { createDataTableSelector } from './selector';

const selector = createDataTableSelector(
  [
    state => state.paging,
    state => state.searching.debouncedSearchValue,
    state => state.sorting
  ],
  (paging, searchValue, sorting) => ({
    ...paging,
    searchValue,
    sorting
  })
);

export const useDataTableParams = <TEntity extends object>(
  store: DataTableStore<TEntity>
) => useSelector(store, selector) as DataTableParams<TEntity>;
