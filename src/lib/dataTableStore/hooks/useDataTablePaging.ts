import { useCallback } from "react";
import { useDataTable } from "../../dataTable/dataTable.context";
import { useSelector } from "../../store/store.hooks";
import type { DataTableState } from "../dataTableStore.types";

export const useDataTablePaging = () => {
  const store = useDataTable();

  const selector = useCallback((state: DataTableState) => state.paging, []);

  return useSelector(store, selector);
};
