import { useRef } from "react";
import { useDataTable } from "../../dataTable";
import { useSelector } from "../../store/store.hooks";
import type { DataTableStore } from "../dataTableStore";
import type { RowKey } from "../dataTableStore.types";
import { createDataTableSelector } from "./selector";

const selector = createDataTableSelector(
  [
    (state) => state.data,
    (state) => state.editing.added,
    (_, store: DataTableStore, rowKey: RowKey) => ({ store, rowKey }),
  ],
  (data, added, { store, rowKey }) =>
    data.find((x) => store.getKey(x) === rowKey) ??
    added.find((x) => store.getKey(x) === rowKey) ??
    null,
  {
    memoizeOptions: {
      maxSize: 1,
    },
  }
);

export const useDataTableRowData = <TEntity extends object>(key: RowKey) => {
  const store = useDataTable<TEntity>();

  const cache = useRef<TEntity>(null);

  const result = useSelector(store, selector, store, key) as TEntity | null;

  if (result !== null) cache.current = result;

  return cache.current;
};

const rowKeysSelector = createDataTableSelector(
  [
    (state) => state.data,
    (state) => state.editing.added,
    (_, store: DataTableStore) => store,
  ],
  (data, added, store) => [
    ...added.map((x) => store.getKey(x)),
    ...data.map((x) => store.getKey(x)),
  ],
  {
    memoizeOptions: {
      maxSize: 1,
    },
  }
);

export const useDataTableRowKeys = <TEntity extends object>() => {
  const store = useDataTable<TEntity>();

  return useSelector(store, rowKeysSelector, store) as RowKey[];
};
