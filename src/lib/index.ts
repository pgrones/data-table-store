import {
  Paging,
  Search,
  SortableTh,
  ToggleSelection,
  ToggleSelectionAll,
} from "./dataTable/components";
import type { DataTableEntity } from "./dataTableStore/dataTableStore.types";
export { useDataTable } from "./dataTable/dataTable.context";
export { DataTableProvider } from "./dataTable/dataTable.provider";
export { DataTableStore } from "./dataTableStore/dataTableStore";

export const createDataTableFor = <TEntity extends DataTableEntity>() => ({
  ToggleSelection,
  ToggleSelectionAll,
  Search,
  Paging,
  SortableTh: (props: Parameters<typeof SortableTh<TEntity>>[0]) =>
    SortableTh(props),
});
