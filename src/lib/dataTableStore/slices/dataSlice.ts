import type { Key, RowKey, SliceCreator } from '../dataTableStore.types';
import type { Column } from './columnSlice';
import { addedRowSymbol } from './editorSlice/editorSlice';

export const isAddedRow = <TEntity extends object>(
  row: Partial<TEntity>
): row is Partial<TEntity> & Record<typeof addedRowSymbol, RowKey> => {
  return Object.getOwnPropertySymbols(row).includes(addedRowSymbol);
};

export interface DataSlice<TEntity extends object> {
  totalEntities: number;
  data: TEntity[];
  setData: (
    newData: { data: TEntity[]; totalEntities: number },
    resetScopedState?: boolean
  ) => void;
  getKey: (row: Partial<TEntity>) => RowKey;
}

export const createDataSlice =
  <TEntity extends object>(
    rowKeyProperties: readonly Key<TEntity>[]
  ): SliceCreator<TEntity, DataSlice<TEntity>> =>
  (set, get) => ({
    data: [],
    totalEntities: 0,
    setData: (newData, resetScopedState = true) =>
      set(() => {
        if (resetScopedState) get().resetScopedStates();

        get().setMaxWidths(calculateMaxWidths(newData.data, get().columns));

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

const tryStringify = (
  cellValue: unknown,
  renderCell: ((value: unknown) => unknown) | undefined
) => {
  const value = renderCell?.(cellValue);

  if (typeof value === 'string') return value;

  switch (typeof cellValue) {
    case 'string':
      return cellValue;
    case 'number':
    case 'bigint':
      return cellValue.toString();
  }
};

const calculateMaxWidths = <TEntity extends object>(
  data: TEntity[],
  columns: Map<string, Column>
) => {
  const maxWidths = new Map<Extract<keyof TEntity, string>, number>();
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;

  for (const row of data) {
    for (const key in row) {
      const styles = columns.get(key)?.fontStyles;

      if (!styles) continue;

      const value = tryStringify(row[key], styles.renderCell);

      if (!value) continue;

      ctx.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
      const width = ctx.measureText(value).width + styles.padding * 2;

      maxWidths.set(key, Math.max(width, maxWidths.get(key) ?? 0));
    }
  }

  return maxWidths;
};
