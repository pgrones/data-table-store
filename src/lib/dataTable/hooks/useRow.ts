import type { RowKey } from '../../dataTableStore';
import { useDataTable } from '../dataTable.context';

export const useCellValue = (rowKey: RowKey, columnKey: string) =>
  useDataTable(state => {
    const row =
      state.data.find(x => state.getKey(x) === rowKey) ??
      state.added.find(x => state.getKey(x) === rowKey);

    if (!row || !(columnKey in row)) return undefined;

    const value =
      state.edited[rowKey]?.[columnKey] ?? row[columnKey as keyof typeof row];

    return value as unknown;
  });
