import { Store } from '../store/store';
import type {
  DataTableArgs,
  DataTableState,
  DataTableStoreOptions,
  Key,
  RowKey,
  UniqueArray
} from './dataTableStore.types';
import { Fetchable, Pagable, Searchable, Selectable, Sortable } from './mixins';
import { Editable } from './mixins/editable/editable';

export class TableStore<TEntity extends object = object> extends Store<
  DataTableState<TEntity>
> {
  private symbolKey = 'data-table';
  private rowKeyProperties: readonly string[];
  protected addedRowSymbol = Symbol.for(this.symbolKey);
  protected searchDebounceTimeout: number;
  protected loadingTimeout: number;
  protected entityFactory: (() => Partial<TEntity>) | null;

  public constructor({
    searchDebounceTimeout,
    loadingTimeout,
    rowKey,
    entityFactory,
    ...state
  }: DataTableArgs<TEntity>) {
    super(state);

    this.entityFactory = entityFactory;
    this.searchDebounceTimeout = searchDebounceTimeout;
    this.loadingTimeout = loadingTimeout;
    this.rowKeyProperties = Array.isArray(rowKey) ? rowKey : [rowKey];
  }

  public get getLoadingTimeout() {
    return this.loadingTimeout;
  }

  public getKey = (row: Partial<TEntity>): RowKey => {
    if (this.isAddedRow(row)) return row[this.addedRowSymbol];

    return Object.entries(row)
      .filter(([key]) => this.rowKeyProperties.includes(key))
      .toSorted(([keyA], [keyB]) => keyA.localeCompare(keyB))
      .map(([_, value]) => value)
      .join(';');
  };

  protected get getScopedStateDefaults(): Partial<DataTableState<TEntity>> {
    return {
      selectedRows: [],
      editing: {
        added: [],
        edited: {},
        deleted: [],
        history: [],
        undoHistory: []
      }
    };
  }

  private isAddedRow = (
    row: Partial<TEntity>
  ): row is Partial<TEntity> & { [key: symbol]: RowKey } => {
    return Object.getOwnPropertySymbols(row).some(
      x => Symbol.keyFor(x) === this.symbolKey
    );
  };
}

export class DataTableStore<TEntity extends object = object> extends Editable(
  Selectable(Searchable(Pagable(Sortable(Fetchable(TableStore)))))
) {
  constructor(args: DataTableArgs<TEntity>) {
    super({ ...args, rowKey: args.rowKey as never[] });
  }
}

// TODO: withType extension
export const createDataTableStoreFactoryFor =
  <TEntity extends object>() =>
  <
    const TRawKeys extends readonly [Key<TEntity>, ...Key<TEntity>[]],
    TRowKey extends UniqueArray<TRawKeys>
  >({
    rowKey,
    entityFactory: defaultEntity = null,
    searchDebounceTimeout = 500,
    loadingTimeout = 500,
    pageSize = 20,
    initialPage = 1,
    initialSearchValue = '',
    initialSorting = null
  }: DataTableStoreOptions<TEntity, TRowKey>) =>
    new DataTableStore<TEntity>({
      rowKey,
      entityFactory: defaultEntity as null,
      searchDebounceTimeout,
      loadingTimeout,
      data: [],
      selectedRows: [],
      isPending: false,
      totalEntities: 0,
      sorting: initialSorting,
      editing: {
        added: [],
        edited: {},
        deleted: [],
        history: [],
        undoHistory: []
      },
      searching: {
        searchValue: initialSearchValue,
        debouncedSearchValue: initialSearchValue
      },
      paging: {
        currentPage: initialPage,
        pageSize
      }
    });
