import type { StoreBase } from "./mixin";

export const Sortable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    public toggleSort = (columnKey: string) => {
      const states = [
        { columnKey, descending: false },
        { columnKey, descending: true },
        null,
      ];

      const stateIndex =
        states.findIndex(
          (x) =>
            x?.columnKey === this.state.sorting?.columnKey &&
            x?.descending === this.state.sorting?.descending
        ) + 1;

      this.apply({
        sorting: states[stateIndex % states.length],
        selectedRows: [],
        editing: {
          added: [],
          edited: {},
          deleted: [],
          history: [],
        },
      });
    };
  };
