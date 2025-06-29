import { useDataTable } from '..';

export const useRowKeys = () =>
  useDataTable(state => [
    ...state.added.map(x => state.getKey(x)),
    ...state.data.map(x => state.getKey(x))
  ]);
