import type { StateCreator } from 'zustand/vanilla';
import {
  type DataSlice,
  type EditorSlice,
  type PaginationSlice,
  type ResetSlice,
  type SearchSlice,
  type SelectionSlice
} from './slices';
import type { ColumnSlice } from './slices/columnSlice';

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

export interface DataTableStoreOptions<
  TEntity extends object,
  TRowKey extends readonly Key<TEntity>[]
> {
  /**
   * Array of keys that uniquely identify an entity.
   * The properties the keys identify must be immutable
   */
  rowKey: UniqueArray<TRowKey>;
  /**
   *  Key to identify the data table. Used to persist state.
   *  Only needed if more than one data-table is present in the app
   *  Default: `data-table`
   * */
  tableKey?: string;
  /** Amount of entities present in a single page. Default: `20`*/
  pageSize?: number;
  /** Page to start on. Default: `1` */
  initialPage?: number;
  /** Sorting to start on. Default: `null` */
  initialSorting?: { sortBy: Key<TEntity>; descending: boolean } | null;
  /** Search to start on. Default: `''` */
  initialSearchValue?: string;
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
  sortBy: Key<TEntity> | null;
  descending: boolean;
}

export type Store<TEntity extends object> = DataSlice<TEntity> &
  EditorSlice<TEntity> &
  ColumnSlice &
  PaginationSlice &
  ResetSlice &
  SearchSlice &
  SelectionSlice & { tableKey: string };

export type SliceCreator<TEntity extends object, Slice> = StateCreator<
  Store<TEntity>,
  [['zustand/immer', never]],
  [],
  Slice
>;
