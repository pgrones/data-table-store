import { createElement } from 'react';
import { useIsInitialized } from '../hooks/useIsInitialized';
import { useTableKey } from '../hooks/useTableKey';
import {
  createRows,
  createVirtualizedRows,
  type CellProps,
  type ColumnProps,
  type HeaderProps,
  type VirtualizedRowsProps
} from './dataDisplay';
import { useCells, useColumnStyles, type StyleProps } from './dataTable.hooks';
import classes from './dataTable.module.css';

export interface DataTableProps<TEntity extends object> extends StyleProps {
  stickyHeader?: boolean;
  stickyHeaderOffset?: number | string;
  virtualized?: Omit<VirtualizedRowsProps<TEntity>, 'children'>;
  children: React.ReactElement<
    ColumnProps<TEntity, string, unknown, unknown>
  >[];
}

export const DataTable = <TEntity extends object>({
  horizontalSpacing = 12,
  stickyHeader = false,
  stickyHeaderOffset = 0,
  virtualized,
  children,
  Header,
  Cell,
  ...styleProps
}: DataTableProps<TEntity> & {
  Cell: React.ComponentType<CellProps>;
  Header: React.ComponentType<React.PropsWithChildren<HeaderProps>>;
}) => {
  const isInitialized = useIsInitialized();
  const tableKey = useTableKey();
  const ref = useColumnStyles({ horizontalSpacing, ...styleProps });
  const [columns, renderRow] = useCells(children, Cell);

  const Rows = createRows<TEntity>();
  const VirtualizedRows = createVirtualizedRows<TEntity>();

  return (
    <div
      role="table"
      ref={ref}
      id={tableKey}
      className={`${classes.table} data-table-table`}
    >
      <div
        role="rowgroup"
        className="data-table-header-row-group"
        style={{
          position: stickyHeader ? 'sticky' : 'unset',
          top: stickyHeaderOffset,
          zIndex: 100
        }}
      >
        <div role="row" className="data-table-row">
          {columns.map(({ columnKey, header, headerProps }) => (
            <div
              role="columnheader"
              className="data-table-header"
              key={columnKey}
            >
              <Header {...headerProps} columnKey={columnKey}>
                {header}
              </Header>
            </div>
          ))}
        </div>
      </div>
      {virtualized ? (
        <VirtualizedRows {...virtualized}>{renderRow}</VirtualizedRows>
      ) : (
        <Rows>{renderRow}</Rows>
      )}

      {!isInitialized && (
        <div
          id="measure-cell"
          style={{
            position: 'absolute',
            visibility: 'hidden',
            height: 0,
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
        >
          {children.map(column =>
            createElement(Cell, {
              ...(column.props.cellProps as object),
              key: column.props.columnKey,
              id: column.props.columnKey,
              style: { padding: horizontalSpacing }
            } as never)
          )}
        </div>
      )}
    </div>
  );
};
