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
      const max = Math.ceil(
        this.state.totalEntities / this.state.paging.pageSize
      );

      this.apply({
        "paging.currentPage": clamp(page, 1, max),
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
