import { useDataTable } from '../dataTable.context';

export const usePagination = () =>
  useDataTable(state => ({
    currentPage: state.currentPage,
    totalPages: Math.ceil(state.totalEntities / state.pageSize),
    setPage: state.setPage
  }));
