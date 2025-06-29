import { useDataTable } from '../dataTable.context';

export const useRowCreation = () => useDataTable(state => state.addRow);
