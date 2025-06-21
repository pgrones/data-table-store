import type { Command } from "./mixins/editable/command";

type Includes<T extends readonly unknown[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : Includes<R, U>
  : false;

type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B
  ? 1
  : 2
  ? true
  : false;

export type UniqueArray<T extends readonly unknown[]> = T extends [
  infer F,
  ...infer R
]
  ? Includes<R, F> extends true
    ? never
    : [F, ...UniqueArray<R>]
  : T;

export type Key<TEntity extends object> = Extract<keyof TEntity, string>;

export interface Paging {
  currentPage: number;
  pageSize: number;
}

export interface Searching {
  searchValue: string;
  debouncedSearchValue: string;
}

export interface Sorting {
  columnKey: string;
  descending: boolean;
}

export interface TypedSorting<TEntity extends object> {
  columnKey: Extract<keyof TEntity, string>;
  descending: boolean;
}

export type RowKey = string;

export interface Editing<TEntity extends object> {
  added: (Partial<TEntity> & { [key: symbol]: RowKey })[];
  edited: Record<RowKey, object>;
  deleted: RowKey[];
  history: Command<Partial<TEntity>>[];
}

export interface DataTableState<TEntity extends object = object> {
  data: TEntity[];
  selectedRows: RowKey[];
  editing: Editing<TEntity>;
  sorting: Sorting | null;
  paging: Paging;
  searching: Searching;
  totalEntities: number;
  isPending: boolean;
}

export interface DataTableArgs<TEntity extends object = object>
  extends DataTableState<TEntity>,
    Pick<
      Required<DataTableStoreOptions<TEntity, never[]>>,
      "loadingOverlayTimeout" | "searchDebounceTimeout" | "entityFactory"
    > {
  rowKey: readonly string[];
}

export interface DataTableStoreOptions<
  TEntity extends object,
  TRowKey extends readonly Key<TEntity>[]
> extends Partial<{
    searchDebounceTimeout: number;
    loadingOverlayTimeout: number;
    pageSize: number;
    initialPage: number;
    initialSorting: TypedSorting<TEntity> | null;
    initialSearchValue: string;
  }> {
  rowKey: UniqueArray<TRowKey>;
  entityFactory?: (() => Omit<TEntity, TRowKey[number]>) | null;
}

export type DataTableData<TEntity extends object> = Pick<
  DataTableState<TEntity>,
  "data" | "totalEntities"
>;

export interface DataTableParams<TEntity extends object> {
  currentPage: number;
  pageSize: number;
  searchValue: string;
  sorting: TypedSorting<TEntity> | null;
}
