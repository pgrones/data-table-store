import {
  Paging,
  Rows,
  Search,
  SortableTh,
  ToggleSelection,
  ToggleSelectionAll,
} from "./dataTable/components";
export { useDataTable } from "./dataTable/dataTable.context";
export { DataTableProvider } from "./dataTable/dataTable.provider";
export { createDataTableStore } from "./dataTableStore/dataTableStore";

export const createDataTableFor = <TEntity extends object>() => ({
  ToggleSelection,
  ToggleSelectionAll,
  Search,
  Paging,
  SortableTh: (props: Parameters<typeof SortableTh<TEntity>>[0]) =>
    SortableTh(props),
  Rows: (props: Parameters<typeof Rows<TEntity>>[0]) => Rows(props),
});
