import type { RowKey } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';

export const useRow = (rowKey: RowKey) =>
  useDataTable(
    state =>
      state.data.find(x => state.getKey(x) === rowKey) ??
      state.added.find(x => state.getKey(x) === rowKey)!
  );
