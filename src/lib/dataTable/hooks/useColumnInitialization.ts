import { useDataTable } from '../dataTable.context';

export interface ColumnOptions {
  isResizable: boolean;
  isSortable: boolean;
  isOrderable: boolean;
  isHidable: boolean;
  defaultWidth: number | string;
}

export const useColumnInitialization = () => {
  const initializeColumn = useDataTable(state => state.initializeColumn);

  return (
    columnKey: string,
    index: number,
    options: Partial<ColumnOptions>
  ) => {
    initializeColumn(columnKey, {
      isHidable: options.isHidable ?? true,
      isOrderable: options.isOrderable ?? true,
      isResizable: options.isResizable ?? true,
      isSortable: options.isSortable ?? true,
      defaultWidth: options.defaultWidth ?? 'minmax(150px, 1fr)',
      defaultPosition: index
    });
  };
};
