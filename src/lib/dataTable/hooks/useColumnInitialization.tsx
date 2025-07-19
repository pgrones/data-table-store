import { useEffect, useRef } from 'react';
import type { ColumnOptions } from '../../dataTableStore/slices';
import { useDataTable } from '../dataTable.context';

export const useColumnInitialization = () => {
  const columnKeyRef = useRef(
    new Map<string, ((value: unknown) => unknown) | undefined>()
  );

  const { initializeColumn, setFontStyles, tableKey } = useDataTable(state => ({
    initializeColumn: state.initializeColumn,
    setFontStyles: state.setFontStyles,
    tableKey: state.tableKey
  }));

  useEffect(() => {
    for (const [columnKey, renderCell] of columnKeyRef.current) {
      const measureCell = document
        .getElementById(tableKey)
        ?.querySelector('#measure-cell')
        ?.querySelector(`#${columnKey}`);

      if (!measureCell) return;

      const computed = getComputedStyle(measureCell);

      setFontStyles(
        columnKey,
        {
          fontFamily: computed.fontFamily,
          fontSize: computed.fontSize,
          fontWeight: computed.fontWeight,
          fontStyle: computed.fontStyle,
          padding: parseFloat(computed.padding)
        },
        renderCell
      );
    }
  }, [setFontStyles, tableKey]);

  return (
    columnKey: string,
    renderCell: ((value: unknown) => unknown) | undefined,
    options: Partial<ColumnOptions> & { defaultPosition: number }
  ) => {
    columnKeyRef.current.set(columnKey, renderCell);

    initializeColumn(columnKey, {
      isHidable: options.isHidable ?? false,
      isOrderable: options.isOrderable ?? true,
      isResizable: options.isResizable ?? true,
      isSortable: options.isSortable ?? true,
      isEditable: options.isEditable ?? true,
      defaultWidth: options.defaultWidth ?? 250,
      defaultPosition: options.defaultPosition
    });
  };
};
