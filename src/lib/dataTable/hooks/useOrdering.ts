import { useCallback } from 'react';
import { useDataTable } from '../dataTable.context';

export const useOrdering = (columnKey: string) => {
  const { column, reorderColumnByKey } = useDataTable(state => ({
    reorderColumnByKey: state.reorderColumn,
    column: state.columns.get(columnKey)
  }));

  const reorderColumn = useCallback(
    (position: number) => reorderColumnByKey(columnKey, position),
    [columnKey, reorderColumnByKey]
  );

  return { isOrderable: !!column?.isOrderable, reorderColumn };
};
