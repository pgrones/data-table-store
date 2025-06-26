import { faker } from '@faker-js/faker';
import type { DataTableData, DataTableParams } from './lib';

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: Date | null;
  gender: string | null;
  job: string;
  avatarUrl: string | null;
  revenue: number;
  trend: number[];
};

const data = Array(103)
  .fill(null)
  .map(
    (): Customer => ({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      birthday: faker.date.anytime(),
      gender: faker.person.gender(),
      avatarUrl: faker.image.avatar(),
      job: faker.person.jobTitle(),
      revenue: faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
      trend: [
        faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
        faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
        faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
        faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }),
        faker.number.float({ min: 0, max: 10000, fractionDigits: 2 })
      ]
    })
  );

function getRndInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const fetchData = ({
  currentPage,
  pageSize,
  searchValue,
  sorting
}: DataTableParams<Customer>) => {
  const key = sorting?.columnKey;
  const desc = sorting?.descending;

  const result = data.filter(
    x =>
      x.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
      x.lastName.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (key)
    result.sort((a, b) =>
      !a[key]
        ? -1
        : !b[key]
        ? 1
        : a[key].toString().localeCompare(b[key].toString())
    );

  if (desc) result.reverse();

  const start = pageSize * (currentPage - 1);

  const response = {
    data: result.slice(start, start + pageSize),
    totalEntities: result.length
  };

  const promise = new Promise<DataTableData<Customer>>(resolve => {
    setTimeout(() => {
      resolve(response);
    }, getRndInteger(20, 1000));
  });

  return promise;
};
