import { Store } from "../store/store";
import type {
  DataTableState,
  DataTableStoreOptions,
  RowKey,
} from "./dataTableStore.types";
import { Fetchable } from "./mixins/fetchable";
import { Pagable } from "./mixins/pagable";
import { Searchable } from "./mixins/searchable";
import { Selectable } from "./mixins/selectable";
import { Sortable } from "./mixins/sortable";

export class TableStore<TEntity extends object = object> extends Store<
  DataTableState<TEntity>
> {
  protected debounceTimeout: number;
  private rowKeyProperties: string[];

  public constructor({
    rowKey = [],
    debounceTimeout = 500,
    pageSize = Infinity,
    initialPage = 1,
    initialSearchValue = "",
    initialSorting = null,
    initialSelectedRows = [],
  }: DataTableStoreOptions<TEntity>) {
    super({
      data: [],
      selectedRows: initialSelectedRows,
      sorting: initialSorting,
      paging: {
        currentPage: initialPage,
        pageSize,
      },
      searching: {
        searchValue: initialSearchValue,
        debouncedSearchValue: initialSearchValue,
      },
      totalEntities: 0,
      isPending: false,
    });

    this.debounceTimeout = debounceTimeout;
    this.rowKeyProperties = Array.isArray(rowKey) ? rowKey : [rowKey];
  }

  public getKey = (row: TEntity) => {
    if (!this.rowKeyProperties.length)
      return this.state.data.indexOf(row).toString();

    return Object.entries(row)
      .toSorted(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .filter(([key]) => this.rowKeyProperties.includes(key))
      .map(([_, value]) => value)
      .join(";") as RowKey;
  };
}

export class DataTableStore<TEntity extends object = object> extends Selectable(
  Searchable(Pagable(Sortable(Fetchable(TableStore))))
) {
  constructor(options?: DataTableStoreOptions<TEntity>) {
    super({
      ...options,
      rowKey: options?.rowKey as never[],
      initialSorting: options?.initialSorting as null,
    });
  }
}

export const createDataTableStore = <TEntity extends object>(
  options?: DataTableStoreOptions<TEntity>
) =>
  new DataTableStore<object>({
    ...options,
    rowKey: options?.rowKey as never[],
    initialSorting: options?.initialSorting as null,
  });
