import { useDataTable } from '../dataTable.context';

export const useReorder = () => useDataTable(state => state.reorderColumn);
