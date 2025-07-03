import { createContext, use } from 'react';
import type { RowKey } from '../../../dataTableStore';

export interface RowContextValues {
  rowKey: RowKey;
}

export const RowContext = createContext<RowContextValues | null>(null);

export const useRowContext = () => {
  const values = use(RowContext);

  if (values === null) throw new Error('RowContext was not found in the tree');

  return values;
};
