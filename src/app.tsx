import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchData, type Customer } from './api';
import { DataTableProvider, createDataTableStoreFactoryFor } from './lib';
import { useDataTableParams } from './lib/dataTable/hooks/useDataTableParams';
import { Table } from './table';

const storeFactory = createDataTableStoreFactoryFor<Customer>();

const store = storeFactory({
  rowKey: ['id'],
  entityFactory: () => ({
    firstName: '',
    lastName: '',
    birthday: null,
    gender: null,
    avatarUrl: null,
    job: '',
    revenue: 0,
    trend: []
  }),
  pageSize: 30,
  initialSorting: { columnKey: 'firstName', descending: false }
});

export const App = () => {
  const params = useDataTableParams(store);

  const { data, isFetching } = useQuery({
    queryKey: ['data', params],
    queryFn: () => fetchData(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false
  });

  return (
    <DataTableProvider store={store} data={data} isPending={isFetching}>
      <Table />
    </DataTableProvider>
  );
};
