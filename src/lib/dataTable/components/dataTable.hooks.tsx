import { Children, useMemo, useState } from 'react';
import type { Key } from '../../dataTableStore';
import { useColumnInitialization, useColumnKeys } from '../hooks';
import { isDataTableColumn, type ColumnProps } from './dataDisplay';

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

  if (!ref) return setRef;

  ref.dataset.highlightOnHover = highlightOnHover.toString();
  ref.dataset.highlightOnSelect = highlightOnSelect.toString();
  ref.dataset.striped = striped === true ? 'odd' : striped.toString();
  ref.dataset.withRowBorders = withRowBorders.toString();
  ref.dataset.withColumnBorders = withColumnBorders.toString();

  ref.style.setProperty('--data-table-hover-color', hoverColor);
  ref.style.setProperty('--data-table-selected-color', selectedColor);
  ref.style.setProperty('--data-table-striped-color', stripedColor);
  ref.style.setProperty('--data-table-border-color', borderColor);
  ref.style.setProperty('--data-table-border', `1px solid ${borderColor}`);

  ref.style.setProperty(
    '--data-table-vertical-spacing',
    typeof verticalSpacing === 'number'
      ? `${verticalSpacing}px`
      : verticalSpacing
  );

  ref.style.setProperty(
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
  cell: React.ReactNode | ((props: { value: unknown }) => React.ReactNode);
  cellProps: { style?: React.CSSProperties };
  headerProps: object;
}

export const useColumns = <TEntity extends object>(
  children: React.ReactElement<ColumnProps<TEntity, string, unknown, unknown>>[]
) => {
  const initializeColumn = useColumnInitialization();
  const columnKeys = useColumnKeys();

  const columns = useMemo(() => {
    const columns: Column<TEntity>[] = [];

    const columnComponents = Children.toArray(children).filter(x =>
      isDataTableColumn<TEntity>(x)
    );

    let index = 0;
    for (const column of columnComponents) {
      const columnKey = column.props.columnKey;

      const cell = column.props.cell as
        | React.ReactNode
        | ((props: { value: unknown }) => React.ReactNode);

      const renderCell =
        typeof cell === 'function'
          ? (value: unknown) => cell({ value })
          : undefined;

      initializeColumn(columnKey, index, renderCell, {
        isHidable: column.props.hidable,
        isOrderable: column.props.orderable,
        isResizable: column.props.resizable,
        isSortable: column.props.sortable,
        defaultWidth: column.props.defaultWidth
      });

      columns[columnKeys.indexOf(columnKey)] = {
        columnKey,
        cell,
        header: column.props.header,
        cellProps: column.props.cellProps ?? {},
        headerProps: column.props.headerProps ?? {}
      };

      index++;
    }

    return columns;
  }, [columnKeys, children, initializeColumn]);

  return columns;
};
