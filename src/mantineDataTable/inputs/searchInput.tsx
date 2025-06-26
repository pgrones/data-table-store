import { SearchInput as DataTableSearchInput } from '../../lib/dataTable/components/inputs/searchInput';
import { SearchInput as Search, type SearchInputProps } from './search';

export const SearchInput = DataTableSearchInput.as<
  Omit<SearchInputProps, 'value'>
>(({ search, searchValue, onChange, ...props }) => {
  const handleChange = (value: string) => {
    search(value);
    onChange?.(value);
  };

  return <Search {...props} value={searchValue} onChange={handleChange} />;
});
