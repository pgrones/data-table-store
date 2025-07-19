import type { RowKey } from '../../dataTableStore';
import { isAddedRowKey } from '../../dataTableStore/slices';
import { useDataTable } from '../dataTable.context';

export const useRowState = (rowKey: RowKey) =>
  useDataTable(state => {
    if (isAddedRowKey(rowKey)) return 'added';

    if (rowKey in state.edited) return 'edited';

    if (state.deleted.includes(rowKey)) return 'deleted';

    return null;
  });
