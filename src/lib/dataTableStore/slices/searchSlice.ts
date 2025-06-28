import type { SliceCreator } from '../dataTableStore.types';

export interface SearchSlice {
  searchValue: string;
  setSearchValue: (searchValue: string) => void;
}

export const createSearchSlice =
  <TEntity extends object>(): SliceCreator<TEntity, SearchSlice> =>
  (set, get) => ({
    searchValue: '',
    debouncedSearchValue: '',
    setSearchValue: searchValue => {
      set({ searchValue });

      get().setPage(1);
      get().resetScopedStates();
    }
  });
