import React, { type PropsWithChildren } from "react";
import { useDataTable } from "../../dataTable.context";
import { createPolymorphicComponent } from "../polymorphism/createPolymorphicComponent";
import { PolymorphicRoot } from "../polymorphism/polymorphicRoot";

interface InternalProps {
  ref?: React.Ref<HTMLButtonElement>;
}

export interface AddRowButtonProps {
  addRow: () => void;
}

const defaultButton = ({ addRow, ...props }: AddRowButtonProps) => (
  <button onClick={addRow} {...props}>
    Add Row
  </button>
);

export const AddRowButton = createPolymorphicComponent<
  "button",
  PropsWithChildren<InternalProps>
>(({ ...props }: PropsWithChildren<InternalProps>) => {
  const dataTable = useDataTable();

  return (
    <PolymorphicRoot
      component={defaultButton}
      {...props}
      addRow={dataTable.addRow}
    />
  );
});
