import { createContext, use } from 'react';
import type { RowKey } from '../../../dataTableStore';

export interface CellContextValues {
  value: React.ReactNode;
  cellValue: unknown;
  rowKey: RowKey;
  columnKey: string;
}

export const CellContext = createContext<CellContextValues | null>(null);

export const useCell = () => {
  const values = use(CellContext);

  if (values === null) throw new Error('CellContext was not found in the tree');

  return values;
};
