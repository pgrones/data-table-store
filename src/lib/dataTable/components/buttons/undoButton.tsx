import React, { type PropsWithChildren } from "react";
import { useDataTable } from "../../dataTable.context";
import { createPolymorphicComponent } from "../polymorphism/createPolymorphicComponent";
import { PolymorphicRoot } from "../polymorphism/polymorphicRoot";
import { useDataTableUndoState } from "../../../dataTableStore/hooks";

interface InternalProps {
  ref?: React.Ref<HTMLButtonElement>;
}

export interface UndoButtonProps {
  undo: () => void;
  canUndo: boolean;
}

const defaultButton = ({ undo, canUndo, ...props }: UndoButtonProps) => (
  <button onClick={undo} disabled={!canUndo} {...props}>
    Undo
  </button>
);

export const UndoButton = createPolymorphicComponent<
  "button",
  PropsWithChildren<InternalProps>
>(({ ...props }: PropsWithChildren<InternalProps>) => {
  const dataTable = useDataTable();
  const canUndo = useDataTableUndoState();

  return (
    <PolymorphicRoot
      component={defaultButton}
      {...props}
      undo={dataTable.undo}
      canUndo={canUndo}
    />
  );
});
