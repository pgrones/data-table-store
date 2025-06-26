import {
  type PaginationProps,
  Pagination as MantinePagination
} from '@mantine/core';
import { Pagination as DataTablePagination } from '../../lib/dataTable';

export const Pagination = DataTablePagination.as<
  Omit<PaginationProps, 'total' | 'value'>
>(({ currentPage, totalPages, setPage, onChange, ...props }) => {
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
