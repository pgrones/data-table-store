import { useDataTable } from '../dataTable.context';

export const useSorting = (columnKey: string) => {
  const sorting = useDataTable(state => {
    const column = state.columns.get(columnKey);

    if (!column) return null;

    return {
      isSortable: column.isSortable,
      isSorted: column.isSorted,
      descending: column.descending,
      toggleColumnSort: state.toggleColumnSort
    };
  });

  if (!sorting) return null;

  return {
    ...sorting,
    toggleColumnSort: () => sorting.toggleColumnSort(columnKey)
  };
};
