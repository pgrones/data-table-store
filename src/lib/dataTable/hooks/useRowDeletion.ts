import { useCallback } from 'react';
import type { RowKey } from '../../dataTableStore/dataTableStore.types';
import { useDataTable } from '../dataTable.context';

export const useRowDeletion = (rowKey: RowKey) => {
  const { deleteRowByKey, isDeleted } = useDataTable(state => ({
    deleteRowByKey: state.deleteRow,
    isDeleted: state.deleted.includes(rowKey)
  }));

  const deleteRow = useCallback(
    () => deleteRowByKey(rowKey),
    [rowKey, deleteRowByKey]
  );

  return { deleteRow, isDeleted };
};
