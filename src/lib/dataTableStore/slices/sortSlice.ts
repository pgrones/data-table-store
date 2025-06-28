import type { Key, SliceCreator } from '../dataTableStore.types';

export interface SortSlice<TEntity extends object, TKey = Key<TEntity>> {
  sortBy: TKey | null;
  descending: boolean;
  toggleSort: (sortBy: TKey) => void;
}

export const createSortSlice =
  <TEntity extends object>(): SliceCreator<TEntity, SortSlice<TEntity>> =>
  (set, get) => ({
    sortBy: null,
    descending: false,
    toggleSort: sortBy =>
      set(state => {
        const states = [
          { sortBy, descending: false },
          { sortBy, descending: true },
          { sortBy: null, descending: false }
        ] as const;

        const stateIndex =
          states.findIndex(
            x =>
              x.sortBy === state.sortBy && x.descending === state.descending
          ) + 1;

        get().resetScopedStates();

        return states[stateIndex % states.length]!;
      })
  });
