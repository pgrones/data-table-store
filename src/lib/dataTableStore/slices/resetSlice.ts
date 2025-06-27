import type { StateCreator } from 'zustand';
import type { EditorSlice } from './editorSlice/editorSlice';
import type { SelectionSlice } from './selectionSlice';

type Store<TEntity extends object> = SelectionSlice &
  EditorSlice<TEntity> &
  ResetSlice;

export interface ResetSlice {
  resetScopedStates: () => void;
}

export const createResetSlice =
  <TEntity extends object>(): StateCreator<
    Store<TEntity>,
    [],
    [],
    ResetSlice
  > =>
  (_, get) => ({
    resetScopedStates: () => {
      get().resetSelection();
      get().resetEditor();
    }
  });
