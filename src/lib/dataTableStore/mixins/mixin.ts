import type { TableStore } from "../dataTableStore";
import type { DataTableEntity } from "../dataTableStore.types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<TClass = object> = new (...args: any[]) => TClass;

export type StoreBase<TEntity extends DataTableEntity> = Constructor<
  TableStore<TEntity>
>;
