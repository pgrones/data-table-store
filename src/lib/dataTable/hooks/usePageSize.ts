import { useDataTable } from '../dataTable.context';

export const usePageSize = () => useDataTable(state => state.pageSize);
