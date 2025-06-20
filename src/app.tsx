import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchData } from "./api";
import { DataTableProvider, createDataTableStore } from "./lib";
import { useDataTableParams } from "./lib/dataTableStore/hooks/useDataTableParams";
import { EditableTable } from "./table";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: Date;
};

const store = createDataTableStore<User>({
  rowKey: "id",
  pageSize: 30,
  initialSorting: { columnKey: "firstName", descending: false },
});

export const App = () => {
  const params = useDataTableParams<User>(store);

  const { data, isFetching } = useQuery({
    queryKey: ["data", params],
    queryFn: () => fetchData(params),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  });

  return (
    <DataTableProvider store={store} data={data} isPending={isFetching}>
      <EditableTable />
    </DataTableProvider>
  );
};
