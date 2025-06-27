import React from 'react';
import { DefaultAddRowButton } from './components/buttons/addRowButton';
import {
  DefaultDeleteRowButton,
  type RequiredDeleteRowButtonProps
} from './components/buttons/deleteRowButton';
import {
  DefaultRestoreRowButton,
  type RequiredRestoreRowButtonProps
} from './components/buttons/restoreRowButton';
import { DefaultUndoButton } from './components/buttons/undoButton';
import { DefaultDataState } from './components/dataDisplay/dataState';
import { DefaultSearchInput } from './components/inputs/searchInput';
import {
  DefaultRowSelector,
  type RequiredRowSelectorProps
} from './components/inputs/rowSelector';
import { DefaultPagination } from './components/inputs/pagination';
import { Rows, type RowsProps } from './components/dataDisplay/rows';
import {
  DefaultSortableTh,
  type RequiredSortableThProps
} from './components/inputs/sortableTh';
import type { DataTableComponents, TypedElement } from './dataTable.types';
import { DefaultAllRowsSelector } from './components/inputs/allRowsSelector';
import { DefaultRedoButton } from './components/buttons/redoButton';

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (base as any)[key] = component;
  }

  return base as T & TCompound;
};

export const createDataTableCreator = <
  TCompoundMap extends { [K in keyof TCompoundMap]: React.ElementType },
  Components extends DataTableComponents<TCompoundMap> = DataTableComponents<TCompoundMap>
>(
  components: Partial<Components> = {}
) => {
  const table = getOrDefault(components.table, 'table');
  const thead = getOrDefault(components.thead, 'thead');
  const tbody = getOrDefault(components.tbody, 'tbody');
  const tfoot = getOrDefault(components.tfoot, 'tfoot');
  const tr = getOrDefault(components.tr, 'tr');
  const td = getOrDefault(components.td, 'td');
  const th = getOrDefault(components.th, 'th');
  const caption = getOrDefault(components.caption, 'caption');
  const colgroup = getOrDefault(components.colgroup, 'colgroup');
  const col = getOrDefault(components.col, 'col');

  const allRowsSelector = getOrDefault(
    components.allRowsSelector,
    DefaultAllRowsSelector
  );
  const rowSelector = getOrDefault(components.rowSelector, DefaultRowSelector);
  const searchInput = getOrDefault(components.searchInput, DefaultSearchInput);
  const sortableTh = getOrDefault(components.sortableTh, DefaultSortableTh);
  const pagination = getOrDefault(components.pagination, DefaultPagination);
  const dataState = getOrDefault(components.dataState, DefaultDataState);

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
    const DataTable = (props: React.ComponentProps<typeof table>) =>
      React.createElement(table, props);

    DataTable.Thead = thead;
    DataTable.Tbody = tbody;
    DataTable.Tfoot = tfoot;
    DataTable.Tr = tr;
    DataTable.Th = th;
    DataTable.Td = td;
    DataTable.Caption = caption;
    DataTable.Colgroup = colgroup;
    DataTable.Col = col;

    DataTable.Rows = Rows as TypedElement<typeof Rows, RowsProps<TEntity>>;
    DataTable.SortableTh = sortableTh as TypedElement<
      typeof sortableTh,
      RequiredSortableThProps<TEntity>
    >;
    DataTable.RowSelector = rowSelector as TypedElement<
      typeof rowSelector,
      RequiredRowSelectorProps<TEntity>
    >;
    DataTable.AllRowsSelector = allRowsSelector;
    DataTable.SearchInput = searchInput;
    DataTable.Pagination = pagination;
    DataTable.DataState = dataState;

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
