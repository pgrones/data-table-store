import type { PropsWithChildren } from "react";
import { useDataTableSort } from "../../dataTableStore/hooks";
import { useDataTable } from "../index";
import {
  type PolymorphicComponentProps,
  createElement,
  createPolymorphicComponent,
} from "./polymorphism/createPolymorphicComponent";

export interface SortableThProps<TEntity extends object> {
  columnKey: Extract<keyof TEntity, string>;
  isSorted: boolean;
  desc: boolean;
  onClick: () => void;
}

export const SortableTh = createPolymorphicComponent<
  "th",
  SortableThProps<object>
>(
  <TEntity extends object, C extends React.ElementType = "th">({
    component = "th",
    columnKey,
    renderRoot,
    ...props
  }: PolymorphicComponentProps<C, SortableThProps<TEntity>>) => {
    const dataTable = useDataTable<TEntity>();
    const { isSorted, desc } = useDataTableSort(columnKey);

    return createElement(renderRoot, component, {
      ...props,
      isSorted,
      desc: desc,
      onClick: () => dataTable.toggleSort(columnKey),
    });
  }
);

export const DefaultSortableTh = <TEntity extends object>({
  children,
  isSorted,
  desc,
  onClick,
  ...props
}: PropsWithChildren<SortableThProps<TEntity>>) => {
  return (
    <th {...props} onClick={onClick}>
      <span>
        {children} {isSorted ? (desc ? "⬇️" : "⬆️") : "↕️"}
      </span>
    </th>
  );
};
