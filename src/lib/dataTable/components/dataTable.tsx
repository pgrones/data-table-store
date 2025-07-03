import {
  createRows,
  createVirtualizedRows,
  type CellProps,
  type ColumnProps,
  type HeaderProps,
  type VirtualizedRowsProps
} from './dataDisplay';
import { DataTableOptionsContext } from './dataTable.context';
import { useCells, useColumnWidths } from './dataTable.hooks';
import classes from './dataTable.module.css';

export interface DataTableProps<TEntity extends object> {
  verticalSpacing?: string | number;
  horizontalSpacing?: string | number;
  stickyHeader?: boolean;
  stickyHeaderOffset?: number | string;
  highlightOnHover?: boolean;
  highlightOnSelect?: boolean;
  striped?: 'even' | 'odd' | boolean;
  withRowBorders?: boolean;
  withColumnBorders?: boolean;
  virtualized?: Omit<VirtualizedRowsProps<TEntity>, 'children'>;
  children: React.ReactElement<
    ColumnProps<TEntity, string, unknown, unknown>
  >[];
}

export const DataTable = <TEntity extends object>({
  horizontalSpacing = 12,
  verticalSpacing = 12,
  stickyHeader = false,
  stickyHeaderOffset = 0,
  highlightOnHover = false,
  highlightOnSelect = false,
  striped = false,
  withRowBorders = true,
  withColumnBorders = false,
  virtualized,
  children,
  Header,
  Cell
}: DataTableProps<TEntity> & {
  Cell: React.ComponentType<CellProps>;
  Header: React.ComponentType<React.PropsWithChildren<HeaderProps>>;
}) => {
  const ref = useColumnWidths(verticalSpacing, horizontalSpacing);

  const [columns, renderRow] = useCells(children, Cell);

  const Rows = createRows<TEntity>();
  const VirtualizedRows = createVirtualizedRows<TEntity>();

  return (
    <DataTableOptionsContext
      value={{
        highlightOnHover,
        highlightOnSelect,
        withRowBorders,
        withColumnBorders,
        striped: striped === true ? 'even' : striped
      }}
    >
      <div role="table" ref={ref} data-data-table>
        <div role="rowgroup">
          <div
            role="row"
            className={classes.row}
            style={{
              position: stickyHeader ? 'sticky' : 'unset',
              top: stickyHeaderOffset
            }}
          >
            {columns.map(({ columnKey, header, headerProps }) => (
              <div role="columnheader" key={columnKey}>
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
      </div>
    </DataTableOptionsContext>
  );
};
