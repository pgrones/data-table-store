import { useDataTable } from '../dataTable.context';

export const useTableKey = () => useDataTable(state => state.tableKey);
