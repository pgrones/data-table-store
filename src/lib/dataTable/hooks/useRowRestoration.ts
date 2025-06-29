import { useCallback } from 'react';
import type { RowKey } from '../../dataTableStore/dataTableStore.types';
import { useDataTable } from '../dataTable.context';

export const useRowRestoration = (rowKey: RowKey) => {
  const { restoreRowByKey, isDirty } = useDataTable(state => ({
    restoreRowByKey: state.restoreRow,
    isDirty: state.deleted.includes(rowKey) || rowKey in state.edited
  }));

  const restoreRow = useCallback(
    () => restoreRowByKey(rowKey),
    [rowKey, restoreRowByKey]
  );

  return { restoreRow, isDirty };
};
