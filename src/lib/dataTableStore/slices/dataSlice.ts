import type { Key, RowKey, SliceCreator } from '../dataTableStore.types';
import { addedRowSymbol } from './editorSlice/editorSlice';

export const isAddedRow = <TEntity extends object>(
  row: Partial<TEntity>
): row is Partial<TEntity> & Record<typeof addedRowSymbol, RowKey> => {
  return Object.getOwnPropertySymbols(row).includes(addedRowSymbol);
};

const hasToString = (value: unknown): value is { toString: () => string } => {
  return (
    value !== null &&
    typeof value === 'object' &&
    typeof value.toString === 'function'
  );
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

        const maxWidths = new Map<string, number>();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        for (const row of newData.data) {
          for (const key in row) {
            let value: string | undefined;

            switch (typeof row[key]) {
              case 'string':
                value = row[key];
                break;
              case 'number':
              case 'bigint':
                value = row[key].toString();
                break;
              case 'object':
                value = hasToString(row[key]) ? row[key].toString() : undefined;
                break;
            }

            if (!value) continue;

            const styles = get().columns.get(key)?.fontStyles;

            if (!styles) continue;

            ctx.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`;
            const width = ctx.measureText(value).width + styles.padding * 2;

            maxWidths.set(key, Math.max(width, maxWidths.get(key) ?? 0));
          }
        }

        get().setMaxWidths(maxWidths);

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
