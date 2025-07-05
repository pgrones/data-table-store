import { Children, useCallback, useMemo, useState } from 'react';
import type { Key } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';
import { useColumnInitialization } from '../hooks';
import {
  isDataTableColumn,
  type CellProps,
  type ColumnProps
} from './dataDisplay';

export interface StyleProps {
  verticalSpacing?: string | number;
  horizontalSpacing?: string | number;
  highlightOnHover?: boolean;
  hoverColor?: string;
  highlightOnSelect?: boolean;
  selectedColor?: string;
  striped?: 'even' | 'odd' | boolean;
  stripedColor?: string;
  withRowBorders?: boolean;
  withColumnBorders?: boolean;
  borderColor?: string;
}

export const useColumnStyles = ({
  horizontalSpacing = 12,
  verticalSpacing = 12,
  highlightOnHover = false,
  hoverColor = 'gray',
  highlightOnSelect = false,
  selectedColor = 'gray',
  striped = false,
  stripedColor = 'gray',
  withRowBorders = false,
  withColumnBorders = false,
  borderColor = 'gray'
}: StyleProps) => {
  const [ref, setRef] = useState<HTMLDivElement | null>(null);

  const widths = useDataTable(state =>
    [...state.columns.values()]
      .toSorted((a, b) => a.postion - b.postion)
      .map(x => x.width)
      .join(' ')
  );

  if (ref) {
    ref.dataset.highlightOnHover = highlightOnHover.toString();
    ref.dataset.highlightOnSelect = highlightOnSelect.toString();
    ref.dataset.striped = striped === true ? 'odd' : striped.toString();
    ref.dataset.withRowBorders = withRowBorders.toString();
    ref.dataset.withColumnBorders = withColumnBorders.toString();
  }

  ref?.style.setProperty('--data-table-column-widths', widths);
  ref?.style.setProperty('--data-table-hover-color', hoverColor);
  ref?.style.setProperty('--data-table-selected-color', selectedColor);
  ref?.style.setProperty('--data-table-striped-color', stripedColor);
  ref?.style.setProperty('--data-table-border-color', borderColor);
  ref?.style.setProperty('--data-table-border', `1px solid ${borderColor}`);

  ref?.style.setProperty(
    '--data-table-vertical-spacing',
    typeof verticalSpacing === 'number'
      ? `${verticalSpacing}px`
      : verticalSpacing
  );

  ref?.style.setProperty(
    '--data-table-horizontal-spacing',
    typeof horizontalSpacing === 'number'
      ? `${horizontalSpacing}px`
      : horizontalSpacing
  );

  return setRef;
};

interface Column<TEntity extends object> {
  columnKey: string;
  header: ColumnProps<TEntity, Key<TEntity>, unknown, unknown>['header'];
  cell: ColumnProps<TEntity, Key<TEntity>, unknown, unknown>['cell'];
  cellProps: object;
  headerProps: object;
}

export const useCells = <TEntity extends object>(
  children: React.ReactElement<
    ColumnProps<TEntity, string, unknown, unknown>
  >[],
  Cell: React.ComponentType<CellProps>
) => {
  const initializeColumn = useColumnInitialization();

  const columns = useMemo(() => {
    const columns: Column<TEntity>[] = [];

    const columnComponents = Children.toArray(children).filter(x =>
      isDataTableColumn<TEntity>(x)
    );

    let index = 0;
    for (const column of columnComponents) {
      const columnKey = column.props.columnKey;

      const cell = column.props.cell;
      const renderCell =
        typeof cell === 'function'
          ? (value: unknown) => cell({ value } as never)
          : undefined;

      initializeColumn(columnKey, index, renderCell, {
        isHidable: column.props.hidable,
        isOrderable: column.props.orderable,
        isResizable: column.props.resizable,
        isSortable: column.props.sortable,
        defaultWidth: column.props.defaultWidth
      });

      columns.push({
        columnKey,
        cell,
        header: column.props.header,
        cellProps: column.props.cellProps ?? {},
        headerProps: column.props.headerProps ?? {}
      });

      index++;
    }

    return columns;
  }, [children, initializeColumn]);

  const renderRow = useCallback(
    (row: Partial<TEntity>) =>
      columns.map(({ columnKey, cell, cellProps }) => {
        const entityValue =
          columnKey in row ? row[columnKey as keyof TEntity] : undefined;

        if (
          cell === undefined &&
          (typeof entityValue !== 'object' || entityValue === null) &&
          typeof entityValue !== 'function'
        ) {
          return (
            <div role="cell" key={columnKey} className="data-table-cell">
              <Cell {...cellProps} value={entityValue as never} />
            </div>
          );
        }

        if (cell !== undefined) {
          const value =
            typeof cell === 'function'
              ? cell({
                  value: entityValue as never
                })
              : cell;

          return (
            <div role="cell" key={columnKey} className="data-table-cell">
              <Cell {...cellProps} value={value} />
            </div>
          );
        }

        throw new Error(
          'The value of column ' +
            columnKey +
            ' is not a valid React element. Consider transforming the value via the cell prop'
        );
      }),
    [columns, Cell]
  );

  return [columns, renderRow] as const;
};
