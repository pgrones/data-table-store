import type { PropsWithChildren } from "react";
import { useDataTableDeletedState } from "../../../dataTableStore/hooks/useDataTableDataState";
import { useDataTable } from "../../dataTable.context";
import { createPolymorphicComponent } from "../polymorphism/createPolymorphicComponent";
import { PolymorphicRoot } from "../polymorphism/polymorphicRoot";

interface InternalProps {
  ref?: React.Ref<HTMLButtonElement>;
  row: object; // TODO: typesafe
}

export interface DeleteRowButtonProps {
  deleteRow: () => void;
  isDeleted: boolean;
}

const defaultButton = ({
  deleteRow,
  isDeleted,
  ...props
}: DeleteRowButtonProps) => (
  <button onClick={deleteRow} disabled={isDeleted} {...props}>
    Delete
  </button>
);

export const DeleteRowButton = createPolymorphicComponent<
  "button",
  PropsWithChildren<InternalProps>
>(({ row, ...props }: PropsWithChildren<InternalProps>) => {
  const dataTable = useDataTable();
  const rowKey = dataTable.getKey(row);
  const isDeleted = useDataTableDeletedState(rowKey);

  return (
    <PolymorphicRoot
      component={defaultButton}
      {...props}
      deleteRow={() => dataTable.deleteRow(rowKey)}
      isDeleted={isDeleted}
    />
  );
});
