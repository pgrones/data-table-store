import type { SliceCreator } from '../dataTableStore.types';

export interface ColumnSlice {
  columns: Column[];
}

export interface ColumnOptions {
  isResizable: boolean;
  isOrderable: boolean;
  isHidable: boolean;
}

export interface Column extends ColumnOptions {
  width: number;
  position: number;
  visible: boolean;
}

export const createColumnSlice =
  <TEntity extends object>(): SliceCreator<TEntity, ColumnSlice> =>
  (set, get) => ({
    columns: []
  });
