import {
  createDataTableStore,
  DataTableProvider,
  useDataTableParams
} from '@lib';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchData, type Customer } from './api';
import { Table } from './table';

const store = createDataTableStore<Customer>({
  rowKey: ['id'],
  createEntity: () => ({
    firstName: '',
    lastName: '',
    birthday: null,
    gender: null,
    avatarUrl: null,
    job: '',
    revenue: 0,
    trend: []
  }),
  pageSize: 50,
  initialSorting: { sortBy: 'firstName', descending: false }
});

export const App = () => {
  const params = useDataTableParams(store);

  const { data } = useQuery({
    queryKey: ['data', params],
    queryFn: () => fetchData(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  });

  return (
    <DataTableProvider store={store} data={data}>
      <Table />
    </DataTableProvider>
  );
};
