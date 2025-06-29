import { useCallback } from 'react';
import type { RowKey } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';

export const useRowSelection = (rowKey: RowKey) => {
  const { toggleRowSelectionByKey, isSelected } = useDataTable(state => ({
    isSelected: state.selection.includes(rowKey),
    toggleRowSelectionByKey: state.toggleRowSelection
  }));

  const toggleRowSelection = useCallback(
    () => toggleRowSelectionByKey(rowKey),
    [rowKey, toggleRowSelectionByKey]
  );

  return { toggleRowSelection, isSelected };
};
