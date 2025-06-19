import type { StoreBase } from "./mixin";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export const Pagable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    public setPage = (page: number) => {
      this.set("paging", (prev) => ({
        ...prev,
        currentPage: clamp(
          page,
          1,
          Math.ceil(this.state.totalEntities / prev.pageSize)
        ),
      }));
    };
  };
