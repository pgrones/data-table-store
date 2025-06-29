import { useDataTable } from '../dataTable.context';

export const useAllRowsSelection = () =>
  useDataTable(state => {
    const selectionCount = state.selection.length;

    return {
      isSelected: selectionCount === state.pageSize,
      indeterminate: !!selectionCount && selectionCount !== state.pageSize,
      toggleAllRowSelections: state.toggleAllRowSelections
    };
  });
