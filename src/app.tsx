import { DataTableProvider, createDataTableStore } from "./lib";
import type { DataTableState } from "./lib/dataTableStore/dataTableStore.types";
import { EditableTable } from "./table";
import { faker } from "@faker-js/faker";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: Date;
};

const data = Array(103)
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthday: faker.date.anytime(),
  }));

const fetchData = (state: DataTableState<User>) => {
  const { currentPage, pageSize } = state.paging;
  const sort = state.sorting;
  const search = state.searching.searchValue;

  const key = sort?.replace("_desc", "") as keyof User | undefined;
  const desc = sort?.endsWith("_desc");

  const result = data.filter(
    (x) => x.firstName.includes(search) || x.lastName.includes(search)
  );

  if (key)
    result.sort((a, b) => a[key].toString().localeCompare(b[key].toString()));

  if (desc) result.reverse();

  const start = pageSize * (currentPage - 1);

  const response = {
    data: result.slice(start, start + pageSize),
    totalEntities: result.length,
  };

  return Promise.resolve(response);
};

const store = createDataTableStore(fetchData, {
  rowKey: "id",
  pageSize: 20,
  initialSorting: "firstName",
});

export const App = () => {
  return (
    <DataTableProvider store={store}>
      <EditableTable />
    </DataTableProvider>
  );
};
