import { isValidElement } from 'react';

export const headerSymbol = Symbol('DataTable.Header');

export const isDataTableHeader = (
  component: unknown
): component is React.ReactElement<React.PropsWithChildren> =>
  isValidElement(component) &&
  (component as unknown as { __name: symbol }).__name === headerSymbol;
