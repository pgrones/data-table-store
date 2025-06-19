import type { DataTableState } from "../dataTableStore.types";
import type { StoreBase } from "./mixin";

export const Fetchable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    private keysToListenTo: string[] = [
      "paging",
      "searching",
      "sorting",
    ] satisfies (keyof DataTableState)[];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...args: any[]) {
      super(...args);

      this.subscribe(this.refreshData);
      this.refreshData(this.state, this.keysToListenTo);
    }

    private refreshData = async (
      state: DataTableState<TEntity>,
      changedKeys: string[]
    ) => {
      if (!this.keysToListenTo.some((key) => changedKeys.includes(key))) return;

      this.apply(await this.fetchData(state));
    };
  };
