import type { PropsWithChildren } from "react";
import { DataTableContext } from "./dataTable.context";
import { DataTableStore } from "../dataTableStore/dataTableStore";

type DataTableProviderProps = PropsWithChildren<{
  store: DataTableStore;
}>;

export const DataTableProvider = ({
  children,
  store,
}: DataTableProviderProps) => (
  <DataTableContext value={store}>{children}</DataTableContext>
);
