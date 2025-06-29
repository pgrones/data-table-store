import { useDataTable } from '../dataTable.context';

export const useRedo = () =>
  useDataTable(state => ({
    redo: state.redo,
    canRedo: !!state.undoHistory.length
  }));
