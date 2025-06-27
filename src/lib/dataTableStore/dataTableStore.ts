import { createStore } from 'zustand/vanilla';
import type {
  DataTableStoreOptions,
  Key,
  UniqueArray
} from './dataTableStore.types';
import {
  createDataSlice,
  createEditorSlice,
  createPaginationSlice,
  createResetSlice,
  createSearchSlice,
  createSelectionSlice,
  createSortSlice,
  type DataSlice,
  type EditorSlice,
  type PaginationSlice,
  type ResetSlice,
  type SearchSlice,
  type SelectionSlice,
  type SortSlice
} from './slices';

const createDataTableStoreFactory =
  <TEntity extends object>() =>
  <
    const TRawKeys extends readonly [Key<TEntity>, ...Key<TEntity>[]],
    TRowKey extends UniqueArray<TRawKeys>
  >({
    rowKey,
    createEntity,
    searchDebounceTimeout = 500,
    initialPage = 1,
    pageSize = 20,
    initialSearchValue = '',
    initialSorting
  }: DataTableStoreOptions<TEntity, TRowKey>) =>
    createStore<
      DataSlice<TEntity> &
        EditorSlice<TEntity> &
        SortSlice<TEntity> &
        PaginationSlice &
        ResetSlice &
        SearchSlice &
        SelectionSlice
    >()((...args) => ({
      ...createDataSlice<TEntity>(rowKey)(...args),
      ...createEditorSlice<TEntity, typeof rowKey>(createEntity)(...args),
      ...createPaginationSlice<TEntity>()(...args),
      ...createResetSlice()(...args),
      ...createSearchSlice(searchDebounceTimeout)(...args),
      ...createSelectionSlice<TEntity>()(...args),
      ...createSortSlice<TEntity>()(...args),
      currentPage: initialPage,
      pageSize,
      searchValue: initialSearchValue,
      sortBy: initialSorting?.sortBy ?? null,
      descending: !!initialSorting?.descending
    }));

export const createDataTableStore = <TEntity extends object>(
  ...args: Parameters<ReturnType<typeof createDataTableStoreFactory<TEntity>>>
) => createDataTableStoreFactory<TEntity>()(...args);
