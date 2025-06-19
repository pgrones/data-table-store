type Key<TEntity extends object> = Extract<keyof TEntity, string>;

export interface Paging {
  currentPage: number;
  pageSize: number;
}

export interface Searching {
  searchValue: string;
  debouncedSearchValue: string;
}

export type Sorting = string | `${string}_desc` | null;

export type RowKey = string;

export interface DataTableState<TEntity extends object = object> {
  data: TEntity[];
  selectedRows: RowKey[];
  sorting: Sorting;
  paging: Paging;
  searching: Searching;
  totalEntities: number;
}

export type DataTableStoreOptions<TEntity extends object> = Partial<{
  rowKey: Key<TEntity> | Array<Key<TEntity>>;
  pageSize: number;
  debounceTimeout: number;
  initialPage: number;
  initialSorting: Key<TEntity> | `${Key<TEntity>}_desc` | null;
  initialSearchValue: string;
  initialSelectedRows: RowKey[];
}>;

type DataTableData<TEntity extends object> = Pick<
  DataTableState<TEntity>,
  "data" | "totalEntities"
>;

export type DataFetcher<TEntity extends object> = (
  state: DataTableState<TEntity>
) => Promise<DataTableData<TEntity>>;
