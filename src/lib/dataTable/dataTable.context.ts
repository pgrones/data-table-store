import { createContext, use } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/shallow';
import type { DataTableStore } from '../dataTableStore/dataTableStore';
import type { Store } from '../dataTableStore/dataTableStore.types';

export const DataTableContext = createContext<DataTableStore<object> | null>(
  null
);

export const useDataTable = <TEntity extends object = object, U = unknown>(
  selector: (state: Store<TEntity>) => U
) => {
  const store = use(
    DataTableContext
  ) as unknown as DataTableStore<TEntity> | null;

  if (store === null)
    throw new Error('DataTableContext was not found in the tree');

  return useStore(store, useShallow(selector));
};
