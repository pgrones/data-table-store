import { Checkbox, type CheckboxProps } from "@mantine/core";
import {
  useDataTableSelection,
  useDataTableSelectionAll,
} from "../../dataTableStore/hooks";
import { useDataTable } from "../index";

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
      {...props}
      checked={isSelected}
      onChange={dataTable.toggleAllRowSelections}
      indeterminate={indeterminate}
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
      {...props}
      checked={isSelected}
      onChange={() => dataTable.toggleRowSelection(row)}
    />
  );
};
