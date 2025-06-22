import { useDataTableSearch } from "../../../dataTableStore/hooks";
import { useDataTable } from "../../dataTable.context";
import {
  createElement,
  createPolymorphicComponent,
  type PolymorphicComponentProps,
} from "../polymorphism/createPolymorphicComponent";

export interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement> | string) => void;
}

export const Search = createPolymorphicComponent<"input", unknown>(
  <C extends React.ElementType = "input">({
    component = "input",
    renderRoot,
    ...props
  }: PolymorphicComponentProps<C>) => {
    const dataTable = useDataTable();
    const searchValue = useDataTableSearch();

    return createElement(renderRoot, component, {
      value: searchValue,
      onChange: (e: React.ChangeEvent<HTMLInputElement> | string) =>
        dataTable.onSearchValueChanged(
          typeof e === "string" ? e : e.currentTarget.value
        ),
      ...props,
    });
  }
);
