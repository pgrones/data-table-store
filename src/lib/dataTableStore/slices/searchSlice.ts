import type { SliceCreator } from '../dataTableStore.types';

export interface SearchSlice {
  searchValue: string;
  setSearchValue: (searchValue: string, resetScopedState?: boolean) => void;
}

export const createSearchSlice =
  <TEntity extends object>(
    searchValue: string
  ): SliceCreator<TEntity, SearchSlice> =>
  (set, get) => ({
    searchValue,
    setSearchValue: (searchValue, resetScopedState = true) => {
      set({ searchValue });

      if (!resetScopedState) return;

      get().setPage(1);
      get().resetScopedStates();
    }
  });
