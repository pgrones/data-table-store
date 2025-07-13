import { useDataTable } from '../dataTable.context';

export const useSorting = (columnKey: string, resetScopedStates = true) => {
  const sorting = useDataTable(state => {
    const column = state.columns.get(columnKey);

    if (!column) return null;

    return {
      isSortable: column.isSortable,
      isSorted: column.isSorted,
      descending: column.descending,
      toggleColumnSort: state.toggleColumnSort,
      sortColumn: state.sortColumn,
      resetColumnSort: state.resetColumnSort
    };
  });

  if (!sorting) return null;

  return {
    ...sorting,
    toggleColumnSort: () =>
      sorting.toggleColumnSort(columnKey, resetScopedStates),
    sortColumn: (descending = false) =>
      sorting.sortColumn(columnKey, descending, resetScopedStates),
    resetColumnSort: () => sorting.resetColumnSort(columnKey, resetScopedStates)
  };
};
