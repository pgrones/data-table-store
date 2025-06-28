import React from 'react';
import { DefaultAddRowButton } from './components/buttons/addRowButton';
import {
  DefaultDeleteRowButton,
  type RequiredDeleteRowButtonProps
} from './components/buttons/deleteRowButton';
import { DefaultRedoButton } from './components/buttons/redoButton';
import {
  DefaultRestoreRowButton,
  type RequiredRestoreRowButtonProps
} from './components/buttons/restoreRowButton';
import { DefaultUndoButton } from './components/buttons/undoButton';
import { DefaultDataState } from './components/dataDisplay/dataState';
import { createTbody, type TbodyProps } from './components/dataDisplay/tbody';
import { DefaultTh, type RequiredThProps } from './components/dataDisplay/th';
import {
  createVirtualizedTbody,
  type VirtualizedTbodyProps
} from './components/dataDisplay/virtualizedTbody';
import { DefaultAllRowsSelector } from './components/inputs/allRowsSelector';
import { DefaultPagination } from './components/inputs/pagination';
import {
  DefaultRowSelector,
  type RequiredRowSelectorProps
} from './components/inputs/rowSelector';
import { DefaultSearchInput } from './components/inputs/searchInput';
import type {
  DataTableComponents,
  TypedElement,
  WithProps
} from './dataTable.types';

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
  const table = getOrDefault(components.table, 'table');
  const thead = getOrDefault(components.thead, 'thead');
  const tbody = getOrDefault(components.tbody, 'tbody');
  const tfoot = getOrDefault(components.tfoot, 'tfoot');
  const tr = getOrDefault(components.tr, 'tr');
  const td = getOrDefault(components.td, 'td');
  const caption = getOrDefault(components.caption, 'caption');
  const colgroup = getOrDefault(components.colgroup, 'colgroup');
  const col = getOrDefault(components.col, 'col');

  const virtualizedTbody = createVirtualizedTbody(tbody);
  const deferredTbody = createTbody(tbody);

  const allRowsSelector = getOrDefault(
    components.allRowsSelector,
    DefaultAllRowsSelector
  );
  const rowSelector = getOrDefault(components.rowSelector, DefaultRowSelector);
  const searchInput = getOrDefault(components.searchInput, DefaultSearchInput);
  const overChargedTh = getOrDefault(components.th, DefaultTh);
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
      React.createElement(table, { ...props, 'data-data-table': true });

    DataTable.Thead = thead;
    DataTable.Tfoot = tfoot;
    DataTable.Tr = tr;
    DataTable.Td = td;
    DataTable.Caption = caption;
    DataTable.Colgroup = colgroup;
    DataTable.Col = col;

    DataTable.Th = overChargedTh as TypedElement<
      typeof overChargedTh,
      RequiredThProps<TEntity>
    >;
    DataTable.Tbody = deferredTbody as TypedElement<
      typeof deferredTbody,
      Parameters<WithProps<typeof tbody, TbodyProps<TEntity>>>[0]
    >;
    DataTable.VirtualizedTbody = virtualizedTbody as TypedElement<
      typeof virtualizedTbody,
      Parameters<WithProps<typeof tbody, VirtualizedTbodyProps<TEntity>>>[0]
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
