import type { PropsWithChildren } from "react";
import { DataTableStore } from "./dataTableStore";
import { DataTableContext } from "./dataTableStore.hooks";
import type { DataTableInitialValues } from "./dataTableStore.types";
import type { Primitive } from "./shared.types";

export const DataTableProvider = <TEntity extends Record<string, Primitive>>({
  children,
  ...props
}: PropsWithChildren<DataTableInitialValues<TEntity>>) => {
  return (
    <DataTableContext value={new DataTableStore(props)}>
      {children}
    </DataTableContext>
  );
};
