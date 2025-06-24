import React, { type PropsWithChildren } from "react";
import { useDataTable } from "../../dataTable.context";
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent,
} from "../polymorphism/createOverridablePolymorphicComponent";
import { PolymorphicRoot } from "../polymorphism/polymorphicRoot";

export interface AddRowButtonProps {
  addRow: () => void;
}

export const AddRowButton = createOverridablePolymorphicComponent<
  "button",
  AddRowButtonProps
>((props: PropsWithChildren) => {
  const dataTable = useDataTable();

  return (
    <PolymorphicRoot<InjectableComponent<AddRowButtonProps>>
      {...props}
      addRow={dataTable.addRow}
    />
  );
});

export const DefaultAddRowButton = AddRowButton.as<
  React.ComponentProps<"button">
>(({ addRow, ...props }) => (
  <button onClick={addRow} {...props}>
    Add Row
  </button>
));
