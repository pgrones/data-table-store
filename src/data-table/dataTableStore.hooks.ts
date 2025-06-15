import { createContext, use } from "react";
import type { DataTableStore } from "./dataTableStore";
import type {
  DataTableState,
  RowKey,
  TypedDataTableState,
} from "./dataTableStore.types";
import {
  createSelectorFor,
  useMemoizedSelector,
  useSelector,
} from "./store.hooks";
import type { Primitive } from "./shared.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DataTableContext = createContext<DataTableStore<any> | null>(null);

export const useDataTable = <TEntity extends Record<string, Primitive>>() => {
  const ctx = use(DataTableContext);

  if (ctx === null) throw new Error("DataTableContext is not provided");

  return ctx as DataTableStore<TEntity>;
};

export const useDataTableRows = <
  TEntity extends Record<string, Primitive>
>() => {
  const store = useDataTable<TEntity>();

  const deps = createSelectorFor<TypedDataTableState<TEntity>>()(
    (state) => state.visibleColumns.join(";"),
    (state) => state.rows.map((x) => x.getKey()).join("~")
  );

  return useMemoizedSelector(store, deps, (columns, rows) => {
    const keys = columns.split(";") as (keyof TEntity)[];
    const rowKeys = rows.split("~") as RowKey[];

    return {
      columns: keys,
      rowKeys: rowKeys as RowKey[],
    } as const;
  });
};

export const useDataTableCell = <TEntity extends Record<string, Primitive>>(
  key: keyof TEntity,
  index: number
) => {
  const store = useDataTable<TEntity>();

  return useSelector(store, (state) => state.rows[index][key]);
};

export const useDataTablePaging = () => {
  const store = useDataTable();

  const deps = createSelectorFor<DataTableState>()(
    (state) => state.paging.currentPage,
    (state) => state.paging.pageSize,
    (state) => state.paging.totalPages,
    (state) => state.totalEntities
  );

  return useMemoizedSelector(
    store,
    deps,
    (currentPage, pageSize, totalPages, totalEntities) =>
      ({
        currentPage,
        pageSize,
        totalPages,
        totalEntities,
      } as const)
  );
};

export const useDataTableSelection = (rowKey: RowKey) => {
  const store = useDataTable();

  return useSelector(store, (state) => state.selectedRows.includes(rowKey));
};
