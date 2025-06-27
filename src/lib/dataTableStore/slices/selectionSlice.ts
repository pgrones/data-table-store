import { produce } from 'immer';
import type { StateCreator } from 'zustand';
import type { RowKey } from '../dataTableStore.types';
import type { DataSlice } from './dataSlice';

export interface SelectionSlice {
  selection: RowKey[];
  toggleRowSelection: (rowKey: RowKey) => void;
  toggleAllRowSelections: () => void;
  resetSelection: () => void;
}

type Store<TEntity extends object> = DataSlice<TEntity> & SelectionSlice;

export const createSelectionSlice =
  <TEntity extends object>(): StateCreator<
    Store<TEntity>,
    [],
    [],
    SelectionSlice
  > =>
  (set, get) => {
    return {
      selection: [],
      toggleRowSelection: rowKey =>
        set(
          produce((state: SelectionSlice) => {
            if (!state.selection.includes(rowKey)) {
              state.selection.push(rowKey);
              return;
            }

            const keyIndex = state.selection.indexOf(rowKey);
            state.selection.splice(keyIndex, 1);
          })
        ),
      toggleAllRowSelections: () =>
        set(state => {
          const allKeys = get().data.map(get().getKey);

          if (allKeys.length !== state.selection.length) {
            return { selection: allKeys };
          }

          return { selection: [] };
        }),
      resetSelection: () => set({ selection: [] })
    };
  };
