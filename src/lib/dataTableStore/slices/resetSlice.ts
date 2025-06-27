import type { SliceCreator } from '../dataTableStore.types';

export interface ResetSlice {
  resetScopedStates: () => void;
}

export const createResetSlice =
  <TEntity extends object>(): SliceCreator<TEntity, ResetSlice> =>
  (_, get) => ({
    resetScopedStates: () => {
      get().resetSelection();
      get().resetEditor();
    }
  });
