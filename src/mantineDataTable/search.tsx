import { type PolymorphicComponentProps } from "@mantine/core";
import type { SearchProps } from "../lib/dataTable/components/inputs/search";
import { SearchInput, type SearchInputProps } from "./searchInput";

export const Search = (
  props: PolymorphicComponentProps<"input", SearchInputProps> & SearchProps
) => <SearchInput {...props} />;
