import { useIsInitialized } from '../hooks/useIsInitialized';
import { useTableKey } from '../hooks/useTableKey';
import {
  RowContext,
  Rows,
  VirtualizedRows,
  type ColumnProps,
  type VirtualizedRowsProps
} from './dataDisplay';
import { ColumnContext } from './dataDisplay/column.context';
import {
  useColumns,
  useColumnStyles,
  type StyleProps
} from './dataTable.hooks';
import classes from './dataTable.module.css';

export interface DataTableProps<TEntity extends object> extends StyleProps {
  stickyHeader?: boolean;
  stickyHeaderOffset?: number | string;
  virtualized?: Omit<VirtualizedRowsProps, 'children'>;
  children: React.ReactElement<
    ColumnProps<TEntity, string, unknown, unknown>
  >[];
}

export const DataTable = <TEntity extends object>({
  stickyHeader = false,
  stickyHeaderOffset = 0,
  virtualized,
  children,
  Header,
  Cell,
  ...styleProps
}: DataTableProps<TEntity> & {
  Cell: React.ComponentType<
    React.PropsWithChildren<{ id?: string; style?: React.CSSProperties }>
  >;
  Header: React.ComponentType<React.PropsWithChildren>;
}) => {
  const isInitialized = useIsInitialized();
  const tableKey = useTableKey();
  const ref = useColumnStyles(styleProps);
  const columns = useColumns(children);

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
            <ColumnContext key={columnKey} value={{ columnKey }}>
              <Header {...headerProps}>{header}</Header>
            </ColumnContext>
          ))}
        </div>
      </div>
      {virtualized ? (
        <VirtualizedRows {...virtualized}>
          {columns.map(({ columnKey, cell, cellProps }) => (
            <ColumnContext key={columnKey} value={{ columnKey, cell }}>
              <Cell {...cellProps} />
            </ColumnContext>
          ))}
        </VirtualizedRows>
      ) : (
        <Rows>
          {columns.map(({ columnKey, cell, cellProps }) => (
            <ColumnContext key={columnKey} value={{ columnKey, cell }}>
              <Cell {...cellProps} />
            </ColumnContext>
          ))}
        </Rows>
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
          {columns.map(({ columnKey, cell, cellProps }) => (
            <ColumnContext key={columnKey} value={{ columnKey, cell }}>
              <RowContext value={{ rowKey: '' }}>
                <Cell {...cellProps} id={columnKey} />
              </RowContext>
            </ColumnContext>
          ))}
        </div>
      )}
    </div>
  );
};
