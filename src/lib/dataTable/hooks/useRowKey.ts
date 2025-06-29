import type { RowKey } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';

export const useRowKey = (row: object): RowKey =>
  useDataTable(state => state.getKey(row));
