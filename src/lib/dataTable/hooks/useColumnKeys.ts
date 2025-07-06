import { useDataTable } from '../dataTable.context';

export const useColumnKeys = () =>
  useDataTable(state =>
    [...state.columns.entries()]
      .toSorted(([_a, a], [_b, b]) => a.position - b.position)
      .map(x => x[0])
  );
