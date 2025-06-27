import type { StateCreator } from 'zustand';
import type { Key, RowKey } from '../dataTableStore.types';
import { addedRowSymbol } from './editorSlice/editorSlice';
import type { ResetSlice } from './resetSlice';

const isAddedRow = <TEntity extends object>(
  row: Partial<TEntity>
): row is Partial<TEntity> & Record<typeof addedRowSymbol, RowKey> => {
  return Object.getOwnPropertySymbols(row).includes(addedRowSymbol);
};

export interface DataSlice<TEntity extends object> {
  isPending: boolean;
  totalEntities: number;
  data: TEntity[];
  setData: (newData: { data: TEntity[]; totalEntities: number }) => void;
  startPending: () => void;
  getKey: (row: Partial<TEntity>) => RowKey;
}

type Store<TEntity extends object> = ResetSlice & DataSlice<TEntity>;

export const createDataSlice =
  <TEntity extends object>(
    rowKeyProperties: readonly Key<TEntity>[]
  ): StateCreator<Store<TEntity>, [], [], DataSlice<TEntity>> =>
  (set, get) => ({
    isPending: false,
    data: [],
    totalEntities: 0,
    startPending: () => set({ isPending: true }),
    setData: newData =>
      set(() => {
        get().resetScopedStates();

        return { ...newData, isPending: false };
      }),
    getKey: row => {
      if (isAddedRow(row)) return row[addedRowSymbol];

      return Object.entries(row)
        .filter(([key]) => rowKeyProperties.includes(key as Key<TEntity>))
        .toSorted(([keyA], [keyB]) => keyA.localeCompare(keyB))
        .map(([_, value]) => value)
        .join(';');
    }
  });
