import { Store } from "../store/store";
import type {
  DataTableEntity,
  DataTableStoreOptions,
  RowKey,
} from "./dataTableStore.types";
import type { DataTableState } from "./dataTableStore.types";
import { Pagable } from "./mixins/pagable";
import { Searchable } from "./mixins/searchable";
import { Selectable } from "./mixins/selectable";
import { Sortable } from "./mixins/sortable";

export class TableStore<
  TEntity extends DataTableEntity = DataTableEntity
> extends Store<DataTableState<TEntity>> {
  protected entityType!: TEntity; // phantom type anchor
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
  }: DataTableStoreOptions<TEntity> = {}) {
    super({
      data: [],
      selectedRows: initialSelectedRows,
      sorting: initialSorting,
      paging: {
        currentPage: initialPage,
        totalPages: 1,
        pageSize,
      },
      searching: {
        searchValue: initialSearchValue,
        debouncedSearchValue: initialSearchValue,
      },
      totalEntities: 0,
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

export class DataTableStore<
  TEntity extends DataTableEntity = DataTableEntity
> extends Selectable(Searchable(Pagable(Sortable(TableStore)))) {
  declare entityType: TEntity; // anchor generic type
}
