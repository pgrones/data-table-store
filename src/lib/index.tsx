/* eslint-disable react-refresh/only-export-components */
import { Table, type TableProps } from "@mantine/core";
import {
  DataStateOverlay,
  Paging,
  Rows,
  Search,
  SortableTh,
  ToggleSelection,
  ToggleSelectionAll,
} from "./dataTable";
import { AddRowButton } from "./dataTable/components/addRowButton";
import { DeleteRowButton } from "./dataTable/components/deleteRowButton";
import type { RowsProps } from "./dataTable/components/rows";
import type { SortableThProps } from "./dataTable/components/sortableTh";
import { UndoButton } from "./dataTable/components/undoButton";
import { RestoreRowButton } from "./dataTable/components/restoreRowButton";

export { DataTableProvider, useDataTable } from "./dataTable/index";
export { createDataTableStoreFactoryFor } from "./dataTableStore/dataTableStore";
export type {
  DataTableData,
  DataTableParams,
  DataTableState,
} from "./dataTableStore/dataTableStore.types";

export const createDataTableFor = <TEntity extends object>() => {
  const DataTable = (props: TableProps) => <Table {...props} />;

  DataTable.Thead = Table.Thead;
  DataTable.Tbody = Table.Tbody;
  DataTable.Tfoot = Table.Tfoot;
  DataTable.Td = Table.Td;
  DataTable.Th = Table.Th;
  DataTable.Tr = Table.Tr;
  DataTable.ScrollContainer = Table.ScrollContainer;
  DataTable.ToggleSelection = ToggleSelection;
  DataTable.ToggleSelectionAll = ToggleSelectionAll;
  DataTable.Search = Search;
  DataTable.Paging = Paging;
  DataTable.DataStateOverlay = DataStateOverlay;
  DataTable.AddRowButton = AddRowButton;
  DataTable.DeleteRowButton = DeleteRowButton;
  DataTable.RestoreRowButton = RestoreRowButton;
  DataTable.UndoButton = UndoButton;
  DataTable.Rows = (props: RowsProps<TEntity>) => <Rows {...props} />;
  DataTable.SortableTh = (props: SortableThProps<TEntity>) => (
    <SortableTh {...props} />
  );

  return DataTable;
};
