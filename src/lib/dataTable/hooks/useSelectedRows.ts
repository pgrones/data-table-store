import { useDataTable } from '../dataTable.context';

export const useSelectedRows = () => useDataTable(state => state.selection);
