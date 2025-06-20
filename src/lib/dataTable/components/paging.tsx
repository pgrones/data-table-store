import { type PaginationProps, Pagination } from "@mantine/core";
import { useDataTablePaging } from "../../dataTableStore/hooks";
import { useDataTable } from "../index";

export const Paging = (
  props: Omit<PaginationProps, "value" | "onChange" | "total">
) => {
  const dataTable = useDataTable();
  const { currentPage, totalPages } = useDataTablePaging();

  console.count("Paging");

  return (
    <Pagination
      {...props}
      value={currentPage}
      onChange={dataTable.setPage}
      total={totalPages}
    />
  );
};
