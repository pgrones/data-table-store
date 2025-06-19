import { useMemo } from "react";
import { useDataTable } from "../../dataTable/dataTable.context";
import { useSelector } from "../../store/store.hooks";
import type { DataTableEntity, RowKey } from "../dataTableStore.types";
import { createDataTableSelector } from "./selector";

export const useDataTableSelection = (row: DataTableEntity) => {
  const store = useDataTable();

  const selector = useMemo(
    () =>
      createDataTableSelector(
        [(state) => state.selectedRows, (_, key: RowKey) => key],
        (selectedRows, key) => selectedRows.includes(key)
      ),
    []
  );

  return useSelector(store, selector, store.getKey(row));
};

export const useDataTableSelectionAll = () => {
  const store = useDataTable();

  const selector = useMemo(
    () =>
      createDataTableSelector(
        [(state) => state.selectedRows, (state) => state.paging.pageSize],
        (selectedRows, pageSize) => ({
          isSelected: !!selectedRows.length,
          indeterminate:
            !!selectedRows.length && selectedRows.length === pageSize,
        })
      ),
    []
  );

  return useSelector(store, selector);
};
