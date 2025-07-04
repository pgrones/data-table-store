import type { SliceCreator } from '../dataTableStore.types';

export interface FontStyles {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  fontStyle: string;
  padding: number;
}

export interface ColumnOptions {
  isResizable: boolean;
  isOrderable: boolean;
  isHidable: boolean;
  isSortable: boolean;
  defaultWidth: number | string;
  defaultPosition: number;
}

export interface Column
  extends Omit<ColumnOptions, 'defaultWidth' | 'defaultPosition'> {
  isSorted: boolean;
  descending: boolean;
  width: string;
  postion: number;
  visible: boolean;
  maxWidth: number | null;
  fontStyles: FontStyles | null;
}

export interface ColumnSlice {
  columns: Map<string, Column>;
  initializeColumn: (key: string, options: ColumnOptions) => void;
  setFontStyles: (key: string, fontStyles: FontStyles) => void;
  setMaxWidths: (entries: Map<string, number>) => void;
  reorderColumn: (key: string, position: number) => void;
  resizeColumn: (key: string, width: number | string) => void;
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
  width: '150px',
  maxWidth: null,
  fontStyles: null,
  postion: 0,
  visible: true
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

    return {
      columns: new Map<string, Column>(),
      initializeColumn: (
        key,
        { defaultWidth, defaultPosition, ...options }
      ) => {
        if (initializedEntries.has(key)) return;

        initializedEntries.add(key);

        let initialSort: Pick<Column, 'isSorted' | 'descending'> | undefined =
          undefined;

        if (key === initialSorting?.[0])
          initialSort = { isSorted: true, descending: initialSorting[1] };

        set(state => {
          state.columns.set(key, {
            ...createDefaultEntry(),
            ...options,
            width:
              typeof defaultWidth === 'number'
                ? `${defaultWidth}px`
                : defaultWidth,
            postion: defaultPosition,
            ...state.columns.get(key),
            ...initialSort
          });
        });
      },
      setFontStyles: (key, fontStyles) => {
        set(state => {
          if (!state.columns.has(key)) return;

          state.columns.get(key)!.fontStyles = fontStyles;
        });
      },
      setMaxWidths: entries => {
        set(state => {
          for (const [key, value] of entries.entries()) {
            if (!state.columns.has(key)) continue;

            state.columns.get(key)!.maxWidth = value;
          }
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

          state.columns.get(key)!.width =
            typeof width === 'number' ? `${width}px` : width;
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
