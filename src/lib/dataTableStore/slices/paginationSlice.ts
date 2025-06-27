import type { SliceCreator } from '../dataTableStore.types';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export interface PaginationSlice {
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  setTotalEntities: (totalEntities: number) => void;
}

export const createPaginationSlice =
  <TEntity extends object>(): SliceCreator<TEntity, PaginationSlice> =>
  (set, get) => ({
    currentPage: 1,
    pageSize: 20,
    setPage: page =>
      set(state => {
        get().resetScopedStates();

        const max = Math.ceil(state.totalEntities / state.pageSize);

        return { currentPage: clamp(page, 1, max) };
      }),
    setTotalEntities: totalEntities => set({ totalEntities })
  });
