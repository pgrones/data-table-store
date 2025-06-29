import { useDataTable } from '../dataTable.context';

export const useUndo = () =>
  useDataTable(state => ({
    undo: state.undo,
    canUndo: !!state.history.length
  }));
