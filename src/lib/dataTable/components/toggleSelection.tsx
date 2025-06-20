import { Checkbox, type CheckboxProps } from "@mantine/core";
import {
  useDataTableSelection,
  useDataTableSelectionAll,
} from "../../dataTableStore/hooks";
import { useDataTable } from "../dataTable.context";

type ToggleSelectionAllProps = Omit<
  CheckboxProps,
  "checked" | "onChange" | "indeterminate"
>;

export const ToggleSelectionAll = (props: ToggleSelectionAllProps) => {
  const dataTable = useDataTable();
  const { isSelected, indeterminate } = useDataTableSelectionAll();

  console.count("ToggleSelectionAll");

  return (
    <Checkbox
      checked={isSelected}
      onChange={dataTable.toggleAllRowSelections}
      indeterminate={indeterminate}
      {...props}
    />
  );
};

interface ToggleSelectionProps<TEntity extends object>
  extends ToggleSelectionAllProps {
  row: TEntity;
  indeterminate?: boolean;
}

export const ToggleSelection = <TEntity extends object>({
  row,
  ...props
}: ToggleSelectionProps<TEntity>) => {
  const dataTable = useDataTable();
  const isSelected = useDataTableSelection(row);

  // console.count("ToggleSelection");

  return (
    <Checkbox
      checked={isSelected}
      onChange={() => dataTable.toggleRowSelection(row)}
      {...props}
    />
  );
};
