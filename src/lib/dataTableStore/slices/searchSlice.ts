import type { StateCreator } from 'zustand';
import type { PaginationSlice } from './paginationSlice';
import type { ResetSlice } from './resetSlice';

export interface SearchSlice {
  searchValue: string;
  debouncedSearchValue: string;
  setSearchValue: (searchValue: string) => void;
}

type Store = PaginationSlice & ResetSlice & SearchSlice;

export const createSearchSlice =
  (searchDebounceTimeout: number): StateCreator<Store, [], [], SearchSlice> =>
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
