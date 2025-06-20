type Key<TEntity extends object> = Extract<keyof TEntity, string>;

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

export interface DataTableState<TEntity extends object = object> {
  data: TEntity[];
  selectedRows: RowKey[];
  sorting: Sorting | null;
  paging: Paging;
  searching: Searching;
  totalEntities: number;
  isPending: boolean;
}

export type DataTableStoreOptions<TEntity extends object> = Partial<{
  rowKey: Key<TEntity> | Array<Key<TEntity>>;
  pageSize: number;
  debounceTimeout: number;
  initialPage: number;
  initialSorting: TypedSorting<TEntity> | null;
  initialSearchValue: string;
  initialSelectedRows: RowKey[];
}>;

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
