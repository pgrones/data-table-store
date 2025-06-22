import {
  useDataTableSelection,
  useDataTableSelectionAll,
} from "../../../dataTableStore/hooks";
import { useDataTable } from "../../index";
import {
  createElement,
  createPolymorphicComponent,
  type PolymorphicComponentProps,
} from "../polymorphism/createPolymorphicComponent";

export interface AllRowsSelectorProps {
  checked: boolean;
  indeterminate: boolean;
  onChange: () => void;
}

export const AllRowsSelector = createPolymorphicComponent<"input", unknown>(
  <C extends React.ElementType = "input">({
    component = "input",
    renderRoot,
    ...props
  }: PolymorphicComponentProps<C>) => {
    const dataTable = useDataTable();
    const { isSelected, indeterminate } = useDataTableSelectionAll();

    return createElement(renderRoot, component, {
      checked: isSelected,
      onChange: dataTable.toggleAllRowSelections,
      indeterminate,
      ...props,
    });
  }
);

export interface RowSelectorProps
  extends Omit<AllRowsSelectorProps, "indeterminate"> {
  row: object;
}

export const RowSelector = createPolymorphicComponent<
  "input",
  RowSelectorProps
>(
  <C extends React.ElementType = "input">({
    component = "input",
    renderRoot,
    row,
    ...props
  }: PolymorphicComponentProps<C, RowSelectorProps>) => {
    const dataTable = useDataTable();
    const isSelected = useDataTableSelection(row);

    return createElement(renderRoot, component, {
      ...props,
      checked: isSelected,
      onChange: () => dataTable.toggleRowSelection(row),
    });
  }
);
