import { useDataTable } from '../dataTable.context';

export const useSearch = () =>
  useDataTable(state => ({
    searchValue: state.searchValue,
    setSearchValue: state.setSearchValue
  }));
