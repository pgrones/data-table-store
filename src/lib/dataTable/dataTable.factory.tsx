import {
  createColumn,
  DataTable as DataTableComponent,
  DefaultAddRowButton,
  DefaultAllRowsSelector,
  DefaultCell,
  DefaultDeleteRowButton,
  DefaultHeader,
  DefaultPagination,
  DefaultRedoButton,
  DefaultRestoreRowButton,
  DefaultRowSelector,
  DefaultSearchInput,
  DefaultUndoButton,
  type DataTableProps
} from './components';
import type { StyleProps } from './components/dataTable.hooks';
import type { DataTableComponents } from './dataTable.types';

const getOrDefault = <
  C extends React.ElementType | undefined,
  D extends React.ElementType
>(
  component: C,
  defaultComponent: D
): C extends React.ElementType ? C : D =>
  (component ?? defaultComponent) as never;

const withCompoundComponents = <T extends React.ElementType, TCompound>(
  base: T,
  compounds?: TCompound
): T & TCompound => {
  if (!compounds) return base as T & TCompound;

  for (const [key, component] of Object.entries(compounds)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
    (base as any)[key] = component;
  }

  return base as T & TCompound;
};

export const createDataTableCreator = <
  TCompoundMap extends { [K in keyof TCompoundMap]: React.ElementType },
  Components extends
    DataTableComponents<TCompoundMap> = DataTableComponents<TCompoundMap>
>(
  tableDefaults:
    | (Pick<DataTableProps<object>, 'stickyHeader' | 'stickyHeaderOffset'> &
        StyleProps)
    | null,
  components: Partial<Components> = {}
) => {
  const cell = getOrDefault(components.cell, DefaultCell);
  const header = getOrDefault(components.header, DefaultHeader);

  const allRowsSelector = getOrDefault(
    components.allRowsSelector,
    DefaultAllRowsSelector
  );
  const rowSelector = getOrDefault(components.rowSelector, DefaultRowSelector);
  const searchInput = getOrDefault(components.searchInput, DefaultSearchInput);
  const pagination = getOrDefault(components.pagination, DefaultPagination);

  const deleteRowButton = getOrDefault(
    components.deleteRowButton,
    DefaultDeleteRowButton
  );
  const restoreRowButton = getOrDefault(
    components.restoreRowButton,
    DefaultRestoreRowButton
  );
  const addRowButton = getOrDefault(
    components.addRowButton,
    DefaultAddRowButton
  );
  const undoButton = getOrDefault(components.undoButton, DefaultUndoButton);
  const redoButton = getOrDefault(components.redoButton, DefaultRedoButton);

  const createDataTable = <TEntity extends object>() => {
    const DataTable = (props: DataTableProps<TEntity>) => (
      <DataTableComponent
        {...tableDefaults}
        {...props}
        Cell={cell}
        Header={header}
      />
    );

    DataTable.Column = createColumn<
      TEntity,
      React.ComponentProps<typeof header>,
      React.ComponentProps<typeof cell>
    >();

    DataTable.RowSelector = rowSelector;
    DataTable.AllRowsSelector = allRowsSelector;
    DataTable.SearchInput = searchInput;
    DataTable.Pagination = pagination;

    DataTable.AddRowButton = addRowButton;
    DataTable.UndoButton = undoButton;
    DataTable.RedoButton = redoButton;
    DataTable.DeleteRowButton = deleteRowButton;
    DataTable.RestoreRowButton = restoreRowButton;

    return withCompoundComponents(
      DataTable,
      components.additionalCompoundComponents
    );
  };

  createDataTable.withType = <TEntity extends object>() =>
    createDataTable<TEntity>();

  return createDataTable;
};

export const createDataTable = <TEntity extends object>() =>
  createDataTableCreator(null).withType<TEntity>();
