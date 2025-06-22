import React from "react";
import type { AddRowButtonProps } from "../buttons/addRowButton";
import type { DeleteRowButtonProps } from "../buttons/deleteRowButton";
import type { RestoreRowButtonProps } from "../buttons/restoreRowButton";
import type { UndoButtonProps } from "../buttons/undoButton";

type TypeMap = {
  AddRowButton: AddRowButtonProps;
  DeleteRowButton: DeleteRowButtonProps;
  RestoreRowButton: RestoreRowButtonProps;
  UndoButton: UndoButtonProps;
};

type DataTableComponent = keyof TypeMap;

type PropsOf<C> = C extends React.ComponentType<infer P> ? P : never;

export const createDataTableComponent = <
  C extends React.ElementType,
  T extends DataTableComponent
>(
  component: TypeMap[T] extends PropsOf<C> ? C : never,
  dataTableComponent: T
) => {
  return (props: Omit<React.ComponentPropsWithRef<C>, keyof TypeMap[T]>) =>
    React.createElement(dataTableComponent, { ...props, component });
};
