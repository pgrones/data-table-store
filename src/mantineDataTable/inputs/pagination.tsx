import { Pagination as DataTablePagination, usePagination } from '@lib';
import {
  Pagination as MantinePagination,
  type PaginationProps
} from '@mantine/core';

export const Pagination = DataTablePagination.as<
  Omit<PaginationProps, 'total' | 'value'>
>(({ onChange, ...props }) => {
  const { currentPage, totalPages, setPage } = usePagination();

  const handleChange = (value: number) => {
    setPage(value);
    onChange?.(value);
  };

  return (
    <MantinePagination
      {...props}
      total={totalPages}
      value={currentPage}
      onChange={handleChange}
    />
  );
});
