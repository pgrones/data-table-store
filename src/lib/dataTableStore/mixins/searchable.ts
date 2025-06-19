import type { StoreBase } from "./mixin";

export const Searchable = <
  TBase extends StoreBase<TEntity>,
  TEntity extends object
>(
  Base: TBase
) =>
  class extends Base {
    private timeoutId: number | null = null;

    public onSearchValueChanged = (searchValue: string) => {
      if (this.timeoutId !== null) clearTimeout(this.timeoutId);

      this.set("searching", {
        searchValue,
        debouncedSearchValue: this.state.searching.debouncedSearchValue,
      });

      this.timeoutId = setTimeout(() => {
        this.set("searching", {
          searchValue,
          debouncedSearchValue: searchValue,
        });

        this.timeoutId = null;
      }, this.debounceTimeout);
    };
  };
