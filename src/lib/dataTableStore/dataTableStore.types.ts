type KeysWithPrimitiveValues<TEntity extends DataTableEntity> = {
  [TKey in keyof TEntity]: TEntity[TKey] extends string | number ? TKey : never;
}[keyof TEntity];

export type DataTableEntity = Record<string, unknown>;

export interface Paging {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

export interface Searching {
  searchValue: string;
  debouncedSearchValue: string;
}

export type Key<TEntity extends DataTableEntity> = Extract<
  KeysWithPrimitiveValues<TEntity>,
  string
>;

export type Sorting = string | `${string}_desc` | null;

export type RowKey = string;

export interface DataTableState<
  TEntity extends DataTableEntity = DataTableEntity
> {
  data: TEntity[];
  selectedRows: RowKey[];
  sorting: Sorting;
  paging: Paging;
  searching: Searching;
  totalEntities: number;
}

export type DataTableStoreOptions<TEntity extends DataTableEntity> = Partial<{
  rowKey: Key<TEntity> | Key<TEntity>[];
  pageSize: number;
  debounceTimeout: number;
  initialPage: number;
  initialSorting: Sorting;
  initialSearchValue: string;
  initialSelectedRows: RowKey[];
}>;
