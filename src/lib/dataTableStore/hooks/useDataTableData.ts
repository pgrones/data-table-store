import { useDataTable } from "../../dataTable";
import { useSelector } from "../../store/store.hooks";
import type { DataTableStore } from "../dataTableStore";
import type { RowKey } from "../dataTableStore.types";
import { createDataTableSelector } from "./selector";

const selector = createDataTableSelector(
  [(state) => state.data, (_, store: DataTableStore) => store],
  (data, store) => data.map((x) => ({ ...x, key: store.getKey(x) }))
);

export type Data<TEntity extends object> = (TEntity & { key: RowKey })[];

export const useDataTableData = <TEntity extends object>() => {
  const store = useDataTable<TEntity>();

  return useSelector(store, selector, store) as Data<TEntity>;
};
