import { isValidElement } from 'react';

export const cellSymbol = Symbol('DataTable.Cell');

export const isDataTableCell = (
  component: unknown
): component is React.ReactElement<{ __value: unknown }> =>
  isValidElement(component) &&
  (component as unknown as { __name: symbol }).__name === cellSymbol;
