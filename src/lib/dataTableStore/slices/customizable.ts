import type { ColumnOptions } from "../dataTableStore.types";
import type { StoreBase } from "./mixin";

export const Customizable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    private columnKeys: string[] = [];

    public registerColumn(columnKey: string, options: ColumnOptions) {
      if (this.columnKeys.includes(columnKey))
        throw new Error(
          "columnKeys must be unique. Try manually specifying a columnKey for " +
            columnKey
        );

      const column = this.state.columns[columnKey];

      this.set("columns.x", {
        width: 0,
        position: 0,
        visible: true,
        ...column,
        ...options
      });
    }
  };
