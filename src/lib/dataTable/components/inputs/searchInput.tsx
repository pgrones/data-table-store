import { useDataTableSearch } from '../../hooks';
import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface SearchProps {
  searchValue: string;
  search: (searchValue: string) => void;
}
export const SearchInput = createOverridablePolymorphicComponent<
  'input',
  SearchProps
>(props => {
  const dataTable = useDataTable();
  const searchValue = useDataTableSearch();

  return (
    <PolymorphicRoot<InjectableComponent<SearchProps>>
      {...props}
      search={dataTable.onSearchValueChanged}
      searchValue={searchValue}
    />
  );
});

export const DefaultSearchInput = SearchInput.as<React.ComponentProps<'input'>>(
  ({ search, searchValue, ...props }) => (
    <input
      placeholder="Search..."
      {...props}
      value={searchValue}
      onChange={e => search(e.target.value)}
    />
  )
);
