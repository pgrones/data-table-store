import type { SliceCreator } from '../dataTableStore.types';

export interface SearchSlice {
  searchValue: string;
  debouncedSearchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const createSearchSlice =
  <TEntity extends object>(
    searchDebounceTimeout: number
  ): SliceCreator<TEntity, SearchSlice> =>
  (set, get) => {
    let timeoutId: number | null = null;

    return {
      searchValue: '',
      debouncedSearchValue: '',
      setSearchValue: searchValue => {
        set({ searchValue });

        if (timeoutId !== null) window.clearTimeout(timeoutId);

        timeoutId = window.setTimeout(() => {
          set({ debouncedSearchValue: searchValue });

          get().setPage(1);
          get().resetScopedStates();

          timeoutId = null;
        }, searchDebounceTimeout);
      }
    };
  };
