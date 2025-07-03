import { createContext, use } from 'react';

export interface DataTableOptions {
  striped: 'odd' | 'even' | false;
  highlightOnHover: boolean;
  highlightOnSelect: boolean;
  withColumnBorders: boolean;
  withRowBorders: boolean;
}

export const DataTableOptionsContext = createContext<DataTableOptions | null>(
  null
);

export const useDataTableOptions = () => {
  const options = use(DataTableOptionsContext);

  if (options === null)
    throw new Error('DataTableOptionsContext was not found in the tree');

  return options;
};
