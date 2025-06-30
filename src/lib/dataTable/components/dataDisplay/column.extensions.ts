import { isValidElement } from 'react';

export const columnSymbol = Symbol('DataTable.Column');

export const isDataTableColumn = (
  component: unknown
): component is React.ReactElement<
  React.PropsWithChildren<{ columnId: string }>
> =>
  isValidElement(component) &&
  (component as unknown as { __name: symbol }).__name === columnSymbol;
