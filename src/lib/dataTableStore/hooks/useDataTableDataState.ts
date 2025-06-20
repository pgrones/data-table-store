import { useDataTable } from "../../dataTable";
import { useSelector } from "../../store/store.hooks";
import type { DataTableState } from "../dataTableStore.types";

const selector = (state: DataTableState) => state.isPending;

export const useDataTableDataState = () => {
  const store = useDataTable();

  return useSelector(store, selector);
};
