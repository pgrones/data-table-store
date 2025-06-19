import type { StoreBase } from "./mixin";

export const Sortable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    public toggleSort = (column: string) => {
      const states = [column, `${column}_desc`, null] as const;
      const stateIndex = states.indexOf(this.state.sorting) + 1;

      this.set("sorting", states[stateIndex % states.length]);
    };
  };
