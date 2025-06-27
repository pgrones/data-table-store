type Includes<T extends readonly unknown[], U> = T extends [infer F, ...infer R]
  ? Equal<F, U> extends true
    ? true
    : Includes<R, U>
  : false;

type Equal<A, B> = (() => unknown extends A
  ? 1
  : 2) extends () => unknown extends B ? 1 : 2
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

export type RowKey = string;

export interface ColumnOptions {
  isResizable: boolean;
  isOrderable: boolean;
  isHidable: boolean;
}

export interface Column extends ColumnOptions {
  width: number;
  position: number;
  visible: boolean;
}

export interface DataTableStoreOptions<
  TEntity extends object,
  TRowKey extends readonly Key<TEntity>[]
> extends Partial<{
    /** Time to wait in ms before a search is performed. Default: 500 */
    searchDebounceTimeout: number;
    /** Amount of entities present in a single page. Default: 20*/
    pageSize: number;
    /** Page to start on. Default: 1 */
    initialPage: number;
    /** Sorting to start on. Default: null */
    initialSorting: { sortBy: Key<TEntity>; descending: boolean };
    /** Search to start on. Default: '' */
    initialSearchValue: string;
  }> {
  /**
   * Array of keys that uniquely identify an entity.
   * The properties the keys identify must be immutable
   */
  rowKey: UniqueArray<TRowKey>;
  /** Factory function to create a new entity when a new row is added */
  createEntity?: () => Omit<TEntity, TRowKey[number]>;
}

export interface DataTableData<TEntity extends object> {
  data: TEntity[];
  totalEntities: number;
}

export interface DataTableParams<TEntity extends object> {
  currentPage: number;
  pageSize: number;
  searchValue: string;
  sorting: { columnKey: Key<TEntity>; descending: boolean } | null;
}
