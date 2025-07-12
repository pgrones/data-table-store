import { createContext, use } from 'react';

export interface ColumnContextValues {
  columnKey: string;
  cell?: React.ReactNode | ((props: { value: unknown }) => React.ReactNode);
}

export const ColumnContext = createContext<ColumnContextValues | null>(null);

export const useColumnContext = () => {
  const values = use(ColumnContext);

  if (values === null)
    throw new Error('ColumnContext was not found in the tree');

  return values;
};
