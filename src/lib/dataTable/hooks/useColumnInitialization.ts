import { useEffect, useRef } from 'react';
import type { Key } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';

export interface ColumnOptions<TEntity extends object, TKey = Key<TEntity>> {
  isResizable: boolean;
  isSortable: boolean;
  isOrderable: boolean;
  isHidable: boolean;
  sortableBy: TKey | null;
}

export const useColumnInitialization = <TEntity extends object>(
  columnKey: string,
  options: Partial<ColumnOptions<TEntity>>
) => {
  const initialized = useRef(false);
  const initializeColumn = useDataTable(state => state.initializeColumn);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    initializeColumn(columnKey, {
      isHidable: options.isHidable ?? true,
      isOrderable: options.isOrderable ?? true,
      isResizable: options.isResizable ?? true,
      isSortable: options.isSortable ?? true
    });
  }, [initializeColumn, columnKey, options]);
};
