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
export const SearchInput = createOverridablePolymorphicComponent<SearchProps>(
  props => {
    const { searchValue, setSearchValue } = useDataTable(state => ({
      searchValue: state.searchValue,
      setSearchValue: state.setSearchValue
    }));

    return (
      <PolymorphicRoot<InjectableComponent<SearchProps>>
        {...props}
        search={setSearchValue}
        searchValue={searchValue}
      />
    );
  }
);

export const DefaultSearchInput = SearchInput.as<React.ComponentProps<'input'>>(
  ({ search, searchValue, ...props }) => (
    <input
      type="search"
      placeholder="Search..."
      {...props}
      value={searchValue}
      onChange={e => search(e.target.value)}
    />
  )
);
