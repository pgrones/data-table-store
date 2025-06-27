import type { StateCreator } from 'zustand';
import type { Key } from '../dataTableStore.types';
import type { ResetSlice } from './resetSlice';

export interface SortSlice<TEntity extends object, TKey = Key<TEntity>> {
  sortBy: TKey | null;
  descending: boolean;
  toggleSort: (columnKey: TKey) => void;
}

type Store<TEntity extends object> = ResetSlice & SortSlice<TEntity>;

export const createSortSlice =
  <TEntity extends object>(): StateCreator<
    Store<TEntity>,
    [],
    [],
    SortSlice<TEntity>
  > =>
  (set, get) => ({
    sortBy: null,
    descending: false,
    toggleSort: columnKey =>
      set(state => {
        const states = [
          { columnKey, descending: false },
          { columnKey, descending: true },
          { columnKey: null, descending: false }
        ];

        const stateIndex =
          states.findIndex(
            x =>
              x.columnKey === state.sortBy && x.descending === state.descending
          ) + 1;

        get().resetScopedStates();

        return states[stateIndex % states.length]!;
      })
  });
