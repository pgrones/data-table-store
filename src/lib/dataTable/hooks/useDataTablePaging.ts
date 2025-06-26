import { useDataTable } from '..';
import { useSelector } from '../../store/store.hooks';
import { createDataTableSelector } from './selector';

const selector = createDataTableSelector(
  [state => state.paging, state => state.totalEntities],
  (paging, totalEntities) => ({
    ...paging,
    totalPages: Math.ceil(totalEntities / paging.pageSize)
  })
);

export const useDataTablePaging = () => {
  const store = useDataTable();

  return useSelector(store, selector);
};
