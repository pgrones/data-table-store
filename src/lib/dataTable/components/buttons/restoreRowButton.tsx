import type { PropsWithChildren } from "react";
import {
  useDataTableDeletedState,
  useDataTableEditedState,
} from "../../../dataTableStore/hooks/useDataTableDataState";
import { useDataTable } from "../../dataTable.context";
import { createPolymorphicComponent } from "../polymorphism/createPolymorphicComponent";
import { PolymorphicRoot } from "../polymorphism/polymorphicRoot";

interface InternalProps {
  ref?: React.Ref<HTMLButtonElement>;
  row: object; // TODO: typesafe
}

export interface RestoreRowButtonProps {
  restoreRow: () => void;
  isDirty: boolean;
}

const defaultButton = ({
  restoreRow,
  isDirty,
  ...props
}: RestoreRowButtonProps) => (
  <button onClick={restoreRow} disabled={!isDirty} {...props}>
    Restore
  </button>
);

export const RestoreRowButton = createPolymorphicComponent<
  "button",
  PropsWithChildren<InternalProps>
>(({ row, ...props }: PropsWithChildren<InternalProps>) => {
  const dataTable = useDataTable();
  const rowKey = dataTable.getKey(row);
  const isDeleted = useDataTableDeletedState(rowKey);
  const isEdited = useDataTableEditedState(rowKey);

  return (
    <PolymorphicRoot
      component={defaultButton}
      {...props}
      restoreRow={() => dataTable.restoreRow(rowKey)}
      isDirty={isDeleted || isEdited}
    />
  );
});
