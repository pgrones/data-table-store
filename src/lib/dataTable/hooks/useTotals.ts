import { useDataTable } from '../dataTable.context';

export const useTotals = () =>
  useDataTable(state => ({
    totalEntities: state.totalEntities,
    pageSize: state.pageSize,
    setPageSize: state.setPageSize
  }));
