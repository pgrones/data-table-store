import { useCallback, useState } from 'react';
import type { RowKey } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';

export const useEditing = (columnKey: string, rowKey: RowKey) => {
  const [isEditing, setEditing] = useState(false);

  const { isEditable, updateRowByKey, ...rest } = useDataTable(state => {
    const column = state.columns.get(columnKey);

    return {
      isEditable:
        !state.deleted.includes(rowKey) && (column?.isEditable ?? false),
      inferredType: column?.inferredType ?? 'string',
      updateRowByKey: state.updateRow,
      isEdited: rowKey in state.edited && columnKey in state.edited[rowKey]!
    };
  });

  const startEditing = useCallback(
    () => isEditable && setEditing(true),
    [isEditable]
  );

  const stopEditing = useCallback(
    () => isEditable && setEditing(false),
    [isEditable]
  );

  const updateValue = useCallback(
    (value: unknown) =>
      isEditable && updateRowByKey(rowKey, columnKey as never, value as never),
    [columnKey, isEditable, rowKey, updateRowByKey]
  );

  return {
    isEditable,
    isEditing,
    startEditing,
    stopEditing,
    updateValue,
    ...rest
  };
};
