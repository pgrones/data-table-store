import React from "react";
import { DefaultAddRowButton } from "./components/buttons/addRowButton";
import { DefaultDeleteRowButton } from "./components/buttons/deleteRowButton";
import { RestoreRowButton } from "./components/buttons/restoreRowButton";
import { UndoButton } from "./components/buttons/undoButton";
import { DataStateOverlay } from "./components/dataStateOverlay";
import { Search } from "./components/inputs/search";
import { AllRowsSelector, RowSelector } from "./components/inputs/selector";
import { Paging } from "./components/paging";
import { Rows, type RowsProps } from "./components/rows";
import {
  DefaultSortableTh,
  SortableTh,
  type SortableThProps,
} from "./components/sortableTh";

interface DataTableComponents {
  table?: React.ElementType;
  thead?: React.ElementType;
  tbody?: React.ElementType;
  tfoot?: React.ElementType;
  tr?: React.ElementType;
  td?: React.ElementType;
  th?: React.ElementType;
  caption?: React.ElementType;
  colgroup?: React.ElementType;
  col?: React.ElementType;
  rowSelector?: React.ElementType;
  allRowsSelector?: React.ElementType;
  search?: React.ElementType;
  paging?: React.ElementType;
  dataStateOverlay?: React.ElementType;
  addRowButton?: React.ElementType;
  deleteRowButton?: React.ElementType;
  restoreRowButton?: React.ElementType;
  undoButton?: React.ElementType;
  sortableTh?: React.ElementType;
}

const getComponent = <
  C extends React.ElementType | undefined,
  D extends React.ElementType
>(
  component: C,
  defaultComponent: D
): C extends React.ElementType ? C : D => {
  return (component ?? defaultComponent) as never;
};

export const createDataTableCreator = <
  Components extends DataTableComponents = DataTableComponents
>(
  components: Partial<Components> = {}
) => {
  const table = getComponent(components.table, "table");
  const thead = getComponent(components.thead, "thead");
  const tbody = getComponent(components.tbody, "tbody");
  const tfoot = getComponent(components.tfoot, "tfoot");
  const tr = getComponent(components.tr, "tr");
  const td = getComponent(components.td, "td");
  const th = getComponent(components.th, "th");
  const caption = getComponent(components.caption, "caption");
  const colgroup = getComponent(components.colgroup, "colgroup");
  const col = getComponent(components.col, "col");

  const rowSelector = getComponent(components.rowSelector, RowSelector);
  const allRowsSelector = getComponent(
    components.allRowsSelector,
    AllRowsSelector
  );
  const search = getComponent(components.search, Search);
  const paging = getComponent(components.paging, Paging);
  const dataStateOverlay = getComponent(
    components.dataStateOverlay,
    DataStateOverlay
  );

  const deleteRowButton = getComponent(
    components.deleteRowButton,
    DefaultDeleteRowButton
  );
  const restoreRowButton = getComponent(
    components.restoreRowButton,
    RestoreRowButton
  );
  const undoButton = getComponent(components.undoButton, UndoButton);
  const addRowButton = getComponent(
    components.addRowButton,
    DefaultAddRowButton
  );

  const createDataTable = <TEntity extends object>() => {
    const TableRows = (props: RowsProps<TEntity>) => <Rows {...props} />;

    const renderSortableTh =
      components.sortableTh ??
      ((props: SortableThProps<TEntity>) => <DefaultSortableTh {...props} />);

    const SortableThComponent = createGenericComponent<TEntity>()(
      (props: SortableThProps<TEntity>) => (
        <SortableTh<"th", typeof props>
          {...props}
          component={components.sortableTh ?? "th"}
          renderRoot={
            components.sortableTh === undefined
              ? (props) => <DefaultSortableTh {...(props as object)} />
              : undefined
          }
        />
      )
    );

    const DataTable = (props: React.ComponentPropsWithRef<typeof table>) =>
      React.createElement(table, props);

    DataTable.Thead = thead;
    DataTable.Tbody = tbody;
    DataTable.Tfoot = tfoot;
    DataTable.Td = tr;
    DataTable.Th = td;
    DataTable.Tr = th;
    DataTable.Caption = caption;
    DataTable.Colgroup = colgroup;
    DataTable.Col = col;

    DataTable.Rows = TableRows;
    DataTable.SortableTh = SortableThComponent;
    DataTable.RowSelector = rowSelector;
    DataTable.AllRowsSelector = allRowsSelector;
    DataTable.Search = search;
    DataTable.Paging = paging;
    DataTable.DataStateOverlay = dataStateOverlay;

    DataTable.DeleteRowButton = deleteRowButton;
    DataTable.RestoreRowButton = restoreRowButton;
    DataTable.UndoButton = undoButton;
    DataTable.AddRowButton = addRowButton;

    return DataTable;
  };

  createDataTable.withType = <TEntity extends object>() =>
    createDataTable<TEntity>();

  return createDataTable;
};

export const createDataTable = <TEntity extends object>() =>
  createDataTableCreator().withType<TEntity>();
