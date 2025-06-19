import { createContext, use } from "react";
import type { DataTableStore } from "../dataTableStore/dataTableStore";
import type { DataTableEntity } from "../dataTableStore/dataTableStore.types";

export const DataTableContext = createContext<DataTableStore | null>(null);

export const useDataTable = <
  TEntity extends DataTableEntity = DataTableEntity
>() => {
  const ctx = use(DataTableContext);

  if (ctx === null) throw new Error("DataTableContext is not provided");

  return ctx as DataTableStore<TEntity>;
};
