import type {
  DataTableInitialValues,
  Row,
  RowKey,
  TypedDataTableState,
} from "./dataTableStore.types";
import type { Primitive } from "./shared.types";
import { Store } from "./store";

export class DataTableStore<
  TEntity extends Record<string, Primitive>
> extends Store<TypedDataTableState<TEntity>> {
  public constructor({
    initialRows,
    rowKey,
    pageSize,
    totalEntities,
    options,
  }: DataTableInitialValues<TEntity>) {
    const propertyKeys: string[] = Array.isArray(rowKey) ? rowKey : [rowKey];
    const rows: Row<TEntity>[] = initialRows.map((x) => ({
      ...x,
      getKey(this) {
        return Object.entries(this)
          .toSorted(([keyA], [keyB]) => keyA.localeCompare(keyB))
          .filter(([key]) => propertyKeys.includes(key))
          .map(([_, value]) => value)
          .join(";");
      },
    }));

    super({
      rows,
      visibleColumns: Object.keys(initialRows[0]) as (keyof TEntity)[],
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
      totalEntities,
    });
  }

  public toggleRowSelection = (rowKey: RowKey) => {
    if (!this.state.selectedRows.includes(rowKey)) {
      this.addListItem("selectedRows", rowKey);
      return;
    }

    const keyIndex = this.state.selectedRows.indexOf(rowKey);

    this.removeListItem("selectedRows", keyIndex);
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

  public onSearchValueChanged = (value: string) => {
    this.set("searching", {
      searchValue: value,
      debouncedSearchValue: this.state.searching.debouncedSearchValue,
    });
  };
}
