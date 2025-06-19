import { useDataTable } from "../../dataTable/dataTable.context";
import { useSelector } from "../../store/store.hooks";
import type { DataTableStore } from "../dataTableStore";
import type { RowKey } from "../dataTableStore.types";
import { createDataTableSelector } from "./selector";

const selector = createDataTableSelector(
  [(state) => state.data, (_, store: DataTableStore) => store],
  (data, store) => data.map((x) => ({ ...x, key: store.getKey(x) }))
);

export const useDataTableData = <TEntity extends object>() => {
  const store = useDataTable<TEntity>();

  return useSelector(store, selector, store) as (TEntity & { key: RowKey })[];
};
