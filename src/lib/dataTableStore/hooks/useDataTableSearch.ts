import { useCallback } from "react";
import { useDataTable } from "../../dataTable/dataTable.context";
import { useSelector } from "../../store/store.hooks";
import type { DataTableState } from "../dataTableStore.types";

export const useDataTableSearch = () => {
  const store = useDataTable();

  const selector = useCallback(
    (state: DataTableState) => state.searching.searchValue,
    []
  );

  return useSelector(store, selector);
};

export const useDataTableDebouncedSearch = () => {
  const store = useDataTable();

  const selector = useCallback(
    (state: DataTableState) => state.searching.debouncedSearchValue,
    []
  );

  return useSelector(store, selector);
};
