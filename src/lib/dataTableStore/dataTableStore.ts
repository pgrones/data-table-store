import { enableMapSet } from 'immer';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { createStore } from 'zustand/vanilla';
import type {
  DataTableStoreOptions,
  Key,
  Store,
  UniqueArray
} from './dataTableStore.types';
import {
  createColumnSlice,
  createDataSlice,
  createEditorSlice,
  createPaginationSlice,
  createResetSlice,
  createSearchSlice,
  createSelectionSlice,
  type Column
} from './slices';

export type DataTableStore<TEntity extends object> = ReturnType<
  ReturnType<typeof createDataTableStoreFactory<TEntity>>
>;

enableMapSet();

const createDataTableStoreFactory =
  <TEntity extends object>() =>
  <
    const TRawKeys extends readonly [Key<TEntity>, ...Key<TEntity>[]],
    TRowKey extends UniqueArray<TRawKeys>
  >({
    rowKey,
    createEntity,
    tableKey = 'data-table',
    initialPage = 1,
    pageSize = 20,
    initialSearchValue = '',
    initialSorting = null
  }: DataTableStoreOptions<TEntity, TRowKey>) =>
    createStore<Store<TEntity>>()(
      persist(
        immer((...args) => ({
          ...createDataSlice<TEntity>(rowKey)(...args),
          ...createEditorSlice<TEntity, typeof rowKey>(createEntity)(...args),
          ...createPaginationSlice<TEntity>(initialPage, pageSize)(...args),
          ...createResetSlice<TEntity>()(...args),
          ...createSearchSlice<TEntity>(initialSearchValue)(...args),
          ...createSelectionSlice<TEntity>()(...args),
          ...createColumnSlice<TEntity>(
            initialSorting && [initialSorting.sortBy, initialSorting.descending]
          )(...args)
        })),
        {
          name: tableKey,
          partialize: state => ({ columns: [...state.columns.entries()] }),
          merge: (persisted, current) => ({
            ...current,
            columns: new Map(
              (persisted as { columns: [string, Column][] }).columns
            )
          })
        }
      )
    );

export const createDataTableStore = <TEntity extends object>(
  ...args: Parameters<ReturnType<typeof createDataTableStoreFactory<TEntity>>>
) => createDataTableStoreFactory<TEntity>()(...args);
