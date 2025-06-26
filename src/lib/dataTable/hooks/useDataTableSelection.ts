import { useDataTable } from '..';
import { useSelector } from '../../store/store.hooks';
import type { RowKey } from '../../dataTableStore/dataTableStore.types';
import { createDataTableSelector } from './selector';

const selector = createDataTableSelector(
  [state => state.selectedRows, (_, key: RowKey) => key],
  (selectedRows, key) => selectedRows.includes(key)
);

export const useDataTableSelection = (rowKey: RowKey) => {
  const store = useDataTable();

  return useSelector(store, selector, rowKey);
};

const allSelector = createDataTableSelector(
  [state => state.selectedRows, state => state.paging.pageSize],
  (selectedRows, pageSize) => ({
    isSelected: selectedRows.length === pageSize,
    indeterminate: !!selectedRows.length && selectedRows.length !== pageSize
  })
);

export const useDataTableSelectionAll = () => {
  const store = useDataTable();

  return useSelector(store, allSelector);
};
