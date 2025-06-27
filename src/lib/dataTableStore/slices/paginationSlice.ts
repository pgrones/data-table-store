import type { StateCreator } from 'zustand';
import type { DataSlice } from './dataSlice';
import type { ResetSlice } from './resetSlice';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

export interface PaginationSlice {
  currentPage: number;
  pageSize: number;
  setPage: (page: number) => void;
  setTotalEntities: (totalEntities: number) => void;
}

type Store<TEntity extends object> = ResetSlice &
  PaginationSlice &
  DataSlice<TEntity>;

export const createPaginationSlice =
  <TEntity extends object>(): StateCreator<
    Store<TEntity>,
    [],
    [],
    PaginationSlice
  > =>
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
