import React, { Children, cloneElement } from 'react';
import {
  isDataTableCell,
  isDataTableColumn,
  isDataTableHeader,
  Rows,
  VirtualizedRows,
  type ColumnProps,
  type VirtualizedRowsProps
} from './dataDisplay';
import { DataTableOptionsContext } from './dataTable.context';

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
  virtualized?: Omit<
    VirtualizedRowsProps<TEntity>,
    'children' | 'verticalSpacing' | 'horizontalSpacing'
  >;
  children: React.ReactElement<ColumnProps<TEntity>>[];
}

export const createDataTable =
  <TEntity extends object>() =>
  ({
    horizontalSpacing = 20,
    verticalSpacing = 20,
    stickyHeader = false,
    stickyHeaderOffset = 0,
    highlightOnHover = false,
    highlightOnSelect = false,
    striped = false,
    withRowBorders = true,
    withColumnBorders = false,
    virtualized,
    children
  }: DataTableProps<TEntity>) => {
    const columns = Children.toArray(children).filter(isDataTableColumn);

    const headers = columns.map(col => ({
      header: Children.toArray(col.props.children).find(isDataTableHeader),
      key: col.props.columnId
    }));

    const cells = columns.map(col => ({
      Cell: Children.toArray(col.props.children).find(isDataTableCell),
      key: col.props.columnId as Extract<keyof TEntity, string>
    }));

    const renderRow = (row: TEntity) =>
      cells.map(
        ({ Cell, key }) =>
          key in row && Cell && cloneElement(Cell, { __value: row[key], key })
      );

    return (
      <DataTableOptionsContext
        value={{
          highlightOnHover,
          highlightOnSelect,
          withRowBorders,
          withColumnBorders,
          horizontalSpacing,
          verticalSpacing,
          striped: striped === true ? 'even' : striped
        }}
      >
        <div role="table">
          <div role="rowgroup">
            <div
              role="row"
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                columnGap: horizontalSpacing,
                paddingBlock: verticalSpacing,
                position: stickyHeader ? 'sticky' : 'unset',
                top: stickyHeaderOffset
              }}
            >
              {headers.map(({ header, key }) => (
                <div role="columnheader" key={key}>
                  {header}
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
