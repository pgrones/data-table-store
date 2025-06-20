import type { DataTableData } from "../dataTableStore.types";
import type { StoreBase } from "./mixin";

export const Fetchable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    public startRefresh() {
      if (!this.state.isPending) this.set("isPending", true);
    }

    public refreshData = (data: DataTableData<TEntity>) => {
      this.apply({ ...data, isPending: false });
    };
  };
