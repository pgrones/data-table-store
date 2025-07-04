import { useDataTable } from '../dataTable.context';

export const useIsInitialized = () =>
  useDataTable(state => {
    const values = [...state.columns.values()];

    return !!values.length && values.every(x => !!x.fontStyles);
  });
