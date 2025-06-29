import type { SliceCreator } from '../dataTableStore.types';

export interface ColumnOptions {
  isResizable: boolean;
  isOrderable: boolean;
  isHidable: boolean;
  isSortable: boolean;
}

export interface Column extends ColumnOptions {
  isSorted: boolean;
  descending: boolean;
  width: number;
  postion: number | null;
  visible: boolean;
}

export interface ColumnSlice {
  columns: Map<string, Column>;
  initializeColumn: (key: string, options: ColumnOptions) => void;
  reorderColumn: (key: string, position: number) => void;
  resizeColumn: (key: string, width: number) => void;
  toggleColumnSort: (key: string, resetScopedStates?: boolean) => void;
  toggleColumnVisibility: (key: string, visible?: boolean) => void;
}

const createDefaultEntry = (): Column => ({
  isOrderable: true,
  isResizable: true,
  isHidable: true,
  isSortable: true,
  isSorted: false,
  descending: false,
  width: 150,
  postion: null,
  visible: false
});

const getNextSort = (isSorted: boolean, descending: boolean) => {
  const states = [
    { isSorted: true, descending: false },
    { isSorted: true, descending: true },
    { isSorted: false, descending: false }
  ] as const;

  const stateIndex =
    states.findIndex(
      x => x.isSorted === isSorted && x.descending === descending
    ) + 1;

  return states[stateIndex % states.length]!;
};

export const createColumnSlice =
  <TEntity extends object>(
    initialSorting: [string, boolean] | null
  ): SliceCreator<TEntity, ColumnSlice> =>
  (set, get) => {
    const initializedEntries = new Set<string>();

    const ensureInitialized = (key: string) => {
      if (initializedEntries.has(key)) return;

      throw new Error(
        `Could not find column state for ${key}.  Did you forget to initialize the column?`
      );
    };

    const columns = !initialSorting
      ? new Map<string, Column>()
      : new Map([
          [
            initialSorting[0],
            { ...createDefaultEntry(), descending: initialSorting[1] }
          ]
        ]);

    return {
      columns,
      initializeColumn: (key, options) => {
        if (initializedEntries.has(key))
          throw new Error(
            'Columns should only be initialized once and columns keys must be unique. Duplicate key: ' +
              key
          );

        initializedEntries.add(key);

        set(state => {
          state.columns.set(key, {
            ...createDefaultEntry(),
            ...options,
            ...state.columns.get(key)
          });
        });
      },
      reorderColumn: (key, position) => {
        ensureInitialized(key);

        set(state => {
          if (!state.columns.get(key)!.isOrderable) return;

          state.columns.get(key)!.postion = position;
        });
      },
      resizeColumn: (key, width) => {
        ensureInitialized(key);

        set(state => {
          if (!state.columns.get(key)!.isResizable) return;

          state.columns.get(key)!.width = width;
        });
      },
      toggleColumnSort: (key, resetScopedStates = true) => {
        ensureInitialized(key);

        set(state => {
          const current = state.columns.get(key)!;

          if (!current.isSortable) return;

          const next = getNextSort(current.isSorted, current.descending);
          const prev = [...state.columns.entries()].find(
            ([_, value]) => value.isSorted
          )?.[0];

          if (prev) {
            state.columns.get(prev)!.isSorted = false;
            state.columns.get(prev)!.descending = false;
          }

          state.columns.get(key)!.isSorted = next.isSorted;
          state.columns.get(key)!.descending = next.descending;

          if (resetScopedStates) get().resetScopedStates();
        });
      },
      toggleColumnVisibility: (key, visible) => {
        ensureInitialized(key);

        set(state => {
          const current = state.columns.get(key)!;

          if (!current.isHidable) return;

          state.columns.get(key)!.visible = visible ?? !current.visible;
        });
      }
    };
  };
