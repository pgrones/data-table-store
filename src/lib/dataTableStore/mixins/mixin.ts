import type { TableStore } from "../dataTableStore";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<TClass = object> = new (...args: any[]) => TClass;

export type StoreBase<TEntity extends object> = Constructor<
  TableStore<TEntity>
>;
