import { isValidElement } from 'react';
import type { ColumnProps } from './column';

export const columnSymbol = Symbol('DataTable.Column');

export const isDataTableColumn = <TEntity extends object>(
  component: unknown
): component is React.ReactElement<
  React.PropsWithChildren<ColumnProps<TEntity, string, unknown, unknown>>
> =>
  isValidElement(component) &&
  (component as unknown as { type?: { __name: symbol } }).type?.__name ===
    columnSymbol;
