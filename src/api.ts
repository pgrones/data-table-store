import { faker } from "@faker-js/faker";
import type { User } from "./app";
import type { DataTableData, DataTableParams } from "./lib";

const data = Array(103)
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthday: faker.date.anytime(),
  }));

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const fetchData = ({
  currentPage,
  pageSize,
  searchValue,
  sorting,
}: DataTableParams<User>) => {
  const key = sorting?.columnKey;
  const desc = sorting?.descending;

  const result = data.filter(
    (x) =>
      x.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      x.lastName.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (key)
    result.sort((a, b) => a[key].toString().localeCompare(b[key].toString()));

  if (desc) result.reverse();

  const start = pageSize * (currentPage - 1);

  const response = {
    data: result.slice(start, start + pageSize),
    totalEntities: result.length,
  };

  const promise = new Promise<DataTableData<User>>((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, getRndInteger(20, 1000));
  });

  return promise;
};
