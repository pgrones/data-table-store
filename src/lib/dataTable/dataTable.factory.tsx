import type { Key } from '../dataTableStore';
import {
  Column,
  createColumn,
  DefaultAddRowButton,
  DefaultAllRowsSelector,
  DefaultCell,
  DefaultDeleteRowButton,
  DefaultPagination,
  DefaultRedoButton,
  DefaultRestoreRowButton,
  DefaultRowSelector,
  DefaultSearchInput,
  DefaultUndoButton,
  Rows,
  VirtualizedRows,
  type ColumnProps,
  type RequiredDeleteRowButtonProps,
  type RequiredRestoreRowButtonProps,
  type RequiredRowSelectorProps,
  type RowsProps,
  type VirtualizedRowsProps
} from './components';
import type { DataTableComponents, TypedElement } from './dataTable.types';

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
  components: Partial<Components> = {}
) => {
  const cell = getOrDefault(components.cell, DefaultCell);

  const allRowsSelector = getOrDefault(
    components.allRowsSelector,
    DefaultAllRowsSelector
  );
  const rowSelector = getOrDefault(components.rowSelector, DefaultRowSelector);
  const searchInput = getOrDefault(components.searchInput, DefaultSearchInput);
  // const overChargedTh = getOrDefault(components.th, DefaultTh);
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
    const DataTable = (props: React.ComponentProps<'div'>) => (
      <div {...props} data-data-table />
    );

    // DataTable.Th = overChargedTh as TypedElement<
    //   typeof overChargedTh,
    //   RequiredThProps<TEntity>
    // >;
    DataTable.Column = createColumn<TEntity>();
    DataTable.Rows = Rows as TypedElement<typeof Rows, RowsProps<TEntity>>;
    DataTable.VirtualizedRows = VirtualizedRows as TypedElement<
      typeof VirtualizedRows,
      VirtualizedRowsProps<TEntity>
    >;
    DataTable.Cell = cell;
    DataTable.RowSelector = rowSelector as TypedElement<
      typeof rowSelector,
      RequiredRowSelectorProps<TEntity>
    >;
    DataTable.AllRowsSelector = allRowsSelector;
    DataTable.SearchInput = searchInput;
    DataTable.Pagination = pagination;

    DataTable.AddRowButton = addRowButton;
    DataTable.UndoButton = undoButton;
    DataTable.RedoButton = redoButton;
    DataTable.DeleteRowButton = deleteRowButton as TypedElement<
      typeof deleteRowButton,
      RequiredDeleteRowButtonProps<TEntity>
    >;
    DataTable.RestoreRowButton = restoreRowButton as TypedElement<
      typeof restoreRowButton,
      RequiredRestoreRowButtonProps<TEntity>
    >;

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
  createDataTableCreator().withType<TEntity>();
