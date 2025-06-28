import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';
import type {
  DataTableStoreOptions,
  Key,
  Store,
  UniqueArray
} from './dataTableStore.types';
import {
  createDataSlice,
  createEditorSlice,
  createPaginationSlice,
  createResetSlice,
  createSearchSlice,
  createSelectionSlice,
  createSortSlice
} from './slices';

export type DataTableStore<TEntity extends object> = ReturnType<
  ReturnType<typeof createDataTableStoreFactory<TEntity>>
>;

const createDataTableStoreFactory =
  <TEntity extends object>() =>
  <
    const TRawKeys extends readonly [Key<TEntity>, ...Key<TEntity>[]],
    TRowKey extends UniqueArray<TRawKeys>
  >({
    rowKey,
    createEntity,
    initialPage = 1,
    pageSize = 20,
    initialSearchValue = '',
    initialSorting
  }: DataTableStoreOptions<TEntity, TRowKey>) =>
    createStore<Store<TEntity>>()(
      immer((...args) => ({
        ...createDataSlice<TEntity>(rowKey)(...args),
        ...createEditorSlice<TEntity, typeof rowKey>(createEntity)(...args),
        ...createPaginationSlice<TEntity>()(...args),
        ...createResetSlice<TEntity>()(...args),
        ...createSearchSlice<TEntity>()(...args),
        ...createSelectionSlice<TEntity>()(...args),
        ...createSortSlice<TEntity>()(...args),
        currentPage: initialPage,
        pageSize,
        searchValue: initialSearchValue,
        sortBy: initialSorting?.sortBy ?? null,
        descending: !!initialSorting?.descending
      }))
    );

export const createDataTableStore = <TEntity extends object>(
  ...args: Parameters<ReturnType<typeof createDataTableStoreFactory<TEntity>>>
) => createDataTableStoreFactory<TEntity>()(...args);
