import type { StateCreator } from 'zustand';

export { createDataSlice, type DataSlice } from './dataSlice';
export { createEditorSlice, type EditorSlice } from './editorSlice/editorSlice';
export { createPaginationSlice, type PaginationSlice } from './paginationSlice';
export { createResetSlice, type ResetSlice } from './resetSlice';
export { createSearchSlice, type SearchSlice } from './searchSlice';
export { createSelectionSlice, type SelectionSlice } from './selectionSlice';
export { createSortSlice, type SortSlice } from './sortSlice';

export type SliceCreator<State, Slice = State> = StateCreator<
  State,
  [['zustand/immer', never]],
  [],
  Slice
>;
