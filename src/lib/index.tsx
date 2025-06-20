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
import { useDataTableDataState } from "./dataTableStore/hooks/useDataTableDataState";

export { useDataTable, DataTableProvider } from "./dataTable/";
export { createDataTableStore } from "./dataTableStore/dataTableStore";
export type {
  DataTableData,
  DataTableParams,
  DataTableState,
} from "./dataTableStore/dataTableStore.types";

export const createDataTableFor = <TEntity extends object>() => {
  const DataTable = (props: TableProps) => {
    const isPending = useDataTableDataState();

    return (
      <Table
        {...props}
        className={`data-table ${props.className}`}
        mod={[
          { pending: isPending },
          ...(Array.isArray(props.mod) ? props.mod : [props.mod]),
        ]}
      />
    );
  };

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
  DataTable.SortableTh = (props: Parameters<typeof SortableTh<TEntity>>[0]) =>
    SortableTh(props);
  DataTable.Rows = (props: Parameters<typeof Rows<TEntity>>[0]) => Rows(props);

  return DataTable;
};
