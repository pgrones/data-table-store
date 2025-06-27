import type { RowKey, SliceCreator } from '../dataTableStore.types';

export interface SelectionSlice {
  selection: RowKey[];
  toggleRowSelection: (rowKey: RowKey) => void;
  toggleAllRowSelections: () => void;
  resetSelection: () => void;
}

export const createSelectionSlice =
  <TEntity extends object>(): SliceCreator<TEntity, SelectionSlice> =>
  (set, get) => {
    return {
      selection: [],
      toggleRowSelection: rowKey =>
        set(state => {
          if (!state.selection.includes(rowKey)) {
            state.selection.push(rowKey);
            return;
          }

          const keyIndex = state.selection.indexOf(rowKey);
          state.selection.splice(keyIndex, 1);
        }),
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
