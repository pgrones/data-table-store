import { useDataTable } from '../dataTable.context';

export const useColumnDimensions = (columnKey: string) =>
  useDataTable(state => {
    const column = state.columns.get(columnKey);

    return { width: column?.width ?? 150, spacing: column?.spacing ?? 0 };
  });
