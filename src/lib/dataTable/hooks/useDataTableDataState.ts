import { useDataTable } from '..';
import { useSelector } from '../../store/store.hooks';
import type { RowKey } from '../../dataTableStore/dataTableStore.types';
import { createDataTableSelector } from './selector';

const selector = createDataTableSelector(
  [state => state.isPending, (_, timeout: number) => timeout],
  (isPending, timeout) => ({ isPending, timeout })
);

export const useDataTableLoadingState = () => {
  const store = useDataTable();

  return useSelector(store, selector, store.getLoadingTimeout);
};

const undoSelector = createDataTableSelector(
  [state => state.editing.history],
  history => !!history.length
);

export const useDataTableUndoState = () => {
  const store = useDataTable();

  return useSelector(store, undoSelector);
};

const redoSelector = createDataTableSelector(
  [state => state.editing.undoHistory],
  history => !!history.length
);

export const useDataTableRedoState = () => {
  const store = useDataTable();

  return useSelector(store, redoSelector);
};

const deleteSelector = createDataTableSelector(
  [state => state.editing.deleted, (_, rowKey: RowKey) => rowKey],
  (deleted, rowKey) => deleted.includes(rowKey)
);

export const useDataTableDeletedState = (rowKey: RowKey) => {
  const store = useDataTable();

  return useSelector(store, deleteSelector, rowKey);
};

const editedSelector = createDataTableSelector(
  [state => state.editing.edited, (_, rowKey: RowKey) => rowKey],
  (edited, rowKey) => rowKey in edited
);

export const useDataTableEditedState = (rowKey: RowKey) => {
  const store = useDataTable();

  return useSelector(store, editedSelector, rowKey);
};
