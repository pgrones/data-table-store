import { SearchInput as DataTableSearchInput, useSearch } from '@lib';
import { SearchInput as Search, type SearchInputProps } from './search';

export const SearchInput = DataTableSearchInput.as<
  Omit<SearchInputProps, 'value'>
>(({ onChange, ...props }) => {
  const { searchValue, setSearchValue } = useSearch();

  const handleChange = (value: string) => {
    setSearchValue(value);
    onChange?.(value);
  };

  return <Search {...props} value={searchValue} onChange={handleChange} />;
});
