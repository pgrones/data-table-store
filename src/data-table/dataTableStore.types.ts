import type { Primitive } from "./shared.types";

type KeysWithPrimitiveValues<TEntity extends Record<string, Primitive>> = {
  [TKey in keyof TEntity]: TEntity[TKey] extends Primitive ? TKey : never;
}[keyof TEntity];

interface Paging {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface Searching {
  searchValue: string;
  debouncedSearchValue: string;
}

export type Row<TEntity extends Record<string, Primitive>> = TEntity & {
  getKey: (this: TEntity) => RowKey;
};

export type Key<TEntity extends Record<string, Primitive>> = Extract<
  KeysWithPrimitiveValues<TEntity>,
  string
>;

export type Sorting<TEntity extends Record<string, Primitive>> =
  | Key<TEntity>
  | `${Key<TEntity>}_desc`;

export type RowKey = string;

export interface DataTableInitialValues<
  TEntity extends Record<string, Primitive>
> {
  initialRows: TEntity[];
  rowKey: Key<TEntity> | Key<TEntity>[];
  totalEntities: number;
  pageSize: number;
  options?: DataTableStoreOptions<TEntity>;
}

export interface DataTableState {
  selectedRows: RowKey[];
  paging: Paging;
  searching: Searching;
  totalEntities: number;
}

export interface TypedDataTableState<TEntity extends Record<string, Primitive>>
  extends DataTableState {
  rows: Row<TEntity>[];
  visibleColumns: (keyof TEntity)[];
  sorting: Sorting<TEntity> | null;
}

export type DataTableStoreOptions<TEntity extends Record<string, Primitive>> =
  Partial<{
    initialSorting: Sorting<TEntity>;
    initialPage: number;
    initialSearchValue: string;
    debounceTimeout: number;
  }>;
