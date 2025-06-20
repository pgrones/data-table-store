import { memo, useEffect, type PropsWithChildren } from "react";
import { DataTableContext } from "./dataTable.context";
import { DataTableStore } from "../dataTableStore/dataTableStore";
import type { DataTableData } from "../dataTableStore/dataTableStore.types";

type DataTableProviderProps<TEntity extends object> = PropsWithChildren<{
  store: DataTableStore<TEntity>;
  data: DataTableData<TEntity> | undefined;
  isPending: boolean;
}>;

export const DataTableProvider = <TEntity extends object>({
  children,
  store,
  data,
  isPending,
}: DataTableProviderProps<TEntity>) => {
  useEffect(() => {
    if (isPending) store.startRefresh();
    else if (data) store.refreshData(data);
  }, [isPending, data, store]);

  return <MemoizedContext store={store}>{children}</MemoizedContext>;
};

const MemoizedContext = memo(
  ({ children, store }: PropsWithChildren<{ store: DataTableStore }>) => {
    return <DataTableContext value={store}>{children}</DataTableContext>;
  },
  (prev, next) => prev.store === next.store
);
