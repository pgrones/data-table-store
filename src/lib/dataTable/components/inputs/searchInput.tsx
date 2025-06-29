import { useSearch } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';

export const SearchInput = createOverridablePolymorphicComponent(props => {
  return <PolymorphicRoot {...props} />;
});

export const DefaultSearchInput = SearchInput.as<React.ComponentProps<'input'>>(
  props => {
    const { searchValue, setSearchValue } = useSearch();

    return (
      <input
        type="search"
        placeholder="Search..."
        {...props}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />
    );
  }
);
