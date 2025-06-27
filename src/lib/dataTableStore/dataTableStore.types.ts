import type { Command } from './mixins/editable/command';

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
  undoHistory: Command<Partial<TEntity>>[];
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
      'loadingTimeout' | 'searchDebounceTimeout' | 'entityFactory'
    > {
  rowKey: readonly string[];
}

export interface DataTableStoreOptions<
  TEntity extends object,
  TRowKey extends readonly Key<TEntity>[]
> extends Partial<{
    /** Time to wait in ms before a search is performed. Default: 500 */
    searchDebounceTimeout: number;
    /** Time to wait in ms before a loading state should be shown. Default: 500 */
    loadingTimeout: number;
    /** Amount of entities present in a single page. Default: 20*/
    pageSize: number;
    /** Page to start on. Default: 1 */
    initialPage: number;
    /** Sorting to start on. Default: null */
    initialSorting: TypedSorting<TEntity> | null;
    /** Search to start on. Default: '' */
    initialSearchValue: string;
  }> {
  /**
   * Array of keys that uniquely identify an entity.
   * The properties the keys identify must be immutable
   */
  rowKey: UniqueArray<TRowKey>;
  /** Factory function to create a new entity when a new row is added */
  entityFactory?: (() => Omit<TEntity, TRowKey[number]>) | null;
}

export type DataTableData<TEntity extends object> = Pick<
  DataTableState<TEntity>,
  'data' | 'totalEntities'
>;

export interface DataTableParams<TEntity extends object> {
  currentPage: number;
  pageSize: number;
  searchValue: string;
  sorting: TypedSorting<TEntity> | null;
}
