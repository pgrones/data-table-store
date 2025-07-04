import { useDataTable } from '../dataTable.context';

export const useResize = (columnKey: string) => {
  const resizing = useDataTable(state => {
    const column = state.columns.get(columnKey);

    if (!column) return null;

    return {
      isResizable: column.isResizable,
      maxWidth: column.maxWidth,
      resizeColumn: state.resizeColumn
    };
  });

  if (!resizing) return null;

  return {
    ...resizing,
    resizeColumn: (width: number | string) =>
      resizing.resizeColumn(columnKey, width)
  };
};
