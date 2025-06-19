import { useDataTable } from "../../dataTable/dataTable.context";
import { useSelector } from "../../store/store.hooks";
import type { DataTableState } from "../dataTableStore.types";

const selector = (state: DataTableState) => state.searching.searchValue;

export const useDataTableSearch = () => {
  const store = useDataTable();

  return useSelector(store, selector);
};

const debounceSelector = (state: DataTableState) =>
  state.searching.debouncedSearchValue;

export const useDataTableDebouncedSearch = () => {
  const store = useDataTable();

  return useSelector(store, debounceSelector);
};
