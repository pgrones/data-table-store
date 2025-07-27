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
    options: Partial<ColumnOptions> & {
      defaultPosition: number;
      isStatic?: boolean;
    }
  ) => {
    columnKeyRef.current.set(columnKey, renderCell);

    let defaultWidth = options.defaultWidth ?? 250;

    defaultWidth =
      typeof defaultWidth === 'number' ? `${defaultWidth}px` : defaultWidth;

    initializeColumn(columnKey, {
      isHidable: !options.isStatic && (options.isHidable ?? false),
      isOrderable: !options.isStatic && (options.isOrderable ?? true),
      isResizable: !options.isStatic && (options.isResizable ?? true),
      isSortable: !options.isStatic && (options.isSortable ?? true),
      isEditable: !options.isStatic && (options.isEditable ?? true),
      defaultWidth: `calc(${defaultWidth} + var(--data-table-horizontal-spacing) * 2)`,
      defaultPosition: options.defaultPosition
    });
  };
};
