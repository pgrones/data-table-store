import { Store } from "./store";

// type Prettify<T> = {
//   [K in keyof T]: T[K];
// } & {};

type Primitive = string | number | boolean | bigint | null;

type KeysWithPrimitiveValues<T> = {
  [K in keyof T]: T[K] extends Primitive ? K : never;
}[keyof T];

type Key<TEntity extends object> = Extract<
  KeysWithPrimitiveValues<TEntity>,
  string
>;

type Sorting<TEntity extends object> = Key<TEntity> | `${Key<TEntity>}_desc`;

interface Paging {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}

interface Searching {
  searchValue: string;
  debouncedSearchValue: string;
}

type RowKey = string;

type Row<TEntity extends object> = TEntity & {
  getKey: (this: TEntity) => RowKey;
};

interface DataTableState<TEntity extends object> {
  rows: Row<TEntity>[];
  selectedRows: RowKey[];
  sorting: Sorting<TEntity> | null;
  paging: Paging;
  searching: Searching;
}

export class DataTableStore<TEntity extends object> extends Store<
  DataTableState<TEntity>
> {
  public constructor(
    initialRows: TEntity[],
    rowKey: Key<TEntity> | Key<TEntity>[],
    totalEntities: number,
    pageSize: number,
    options?: Partial<{
      initialSorting: Sorting<TEntity> | null;
      initialPage: number;
      initialSearchValue: string;
    }>
  ) {
    const propertyKeys = Array.isArray(rowKey) ? rowKey : [rowKey];
    const rows: Row<TEntity>[] = initialRows.map((x) => ({
      ...x,
      getKey(this) {
        return Object.entries(x)
          .toSorted((a, b) => a[0].localeCompare(b[0]))
          .filter(([key]) => propertyKeys.includes(key as Key<TEntity>))
          .map(([_, value]) => value)
          .join(",");
      },
    }));

    super({
      rows,
      selectedRows: [],
      sorting: options?.initialSorting ?? null,
      paging: {
        currentPage: options?.initialPage ?? 1,
        totalPages: Math.ceil(totalEntities / pageSize),
        pageSize,
      },
      searching: {
        searchValue: options?.initialSearchValue ?? "",
        debouncedSearchValue: options?.initialSearchValue ?? "",
      },
    });
  }

  public toggleRowSelection = (row: Row<TEntity>) => {
    const key = row.getKey();

    if (!this.state.selectedRows.includes(key)) {
      this.add("selectedRows", key);
      return;
    }

    const keyIndex = this.state.selectedRows.indexOf(key);

    this.remove("selectedRows", keyIndex);
    return;
  };

  public toggleAllRowSelections = () => {
    const allKeys = this.state.rows.map((x) => x.getKey());

    if (allKeys.length !== this.state.selectedRows.length) {
      this.set("selectedRows", allKeys);
      return;
    }

    this.set("selectedRows", []);
  };
}

new DataTableStore(
  [{ a: "asd", b: 1, c: "as" }],
  ["a", "b"],
  10,
  2
).toggleAllRowSelections();
