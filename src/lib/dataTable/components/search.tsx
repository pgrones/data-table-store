import { type TextInputProps, TextInput } from "@mantine/core";
import { useDataTableSearch } from "../../dataTableStore/hooks";
import { useDataTable } from "../dataTable.context";

export const Search = (props: Omit<TextInputProps, "value" | "onChange">) => {
  const dataTable = useDataTable();
  const searchValue = useDataTableSearch();

  console.count("Search");

  return (
    <TextInput
      {...props}
      value={searchValue}
      onChange={(e) => dataTable.onSearchValueChanged(e.currentTarget.value)}
    />
  );
};
