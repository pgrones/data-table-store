import type { SliceCreator } from '../dataTableStore.types';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export interface PaginationSlice {
  currentPage: number;
  pageSize: number;
  setPage: (page: number, resetScopedState?: boolean) => void;
  setPageSize: (pageSize: number, resetScopedState?: boolean) => void;
  setTotalEntities: (totalEntities: number) => void;
}

export const createPaginationSlice =
  <TEntity extends object>(
    currentPage: number,
    pageSize: number
  ): SliceCreator<TEntity, PaginationSlice> =>
  (set, get) => ({
    currentPage,
    pageSize,
    setPage: (page, resetScopedState = true) =>
      set(state => {
        if (resetScopedState) get().resetScopedStates();

        const max = Math.ceil(state.totalEntities / state.pageSize);

        return { currentPage: clamp(page, 1, max) };
      }),
    setPageSize: (pageSize, resetScopedState = true) =>
      set(state => {
        if (resetScopedState) get().resetScopedStates();

        const max = Math.min(state.totalEntities, 500);

        return { pageSize: clamp(pageSize, 1, max) };
      }),
    setTotalEntities: totalEntities => set({ totalEntities })
  });
