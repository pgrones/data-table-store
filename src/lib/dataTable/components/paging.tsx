import { type PaginationProps, Pagination } from "@mantine/core";
import { useDataTablePaging } from "../../dataTableStore/hooks";
import { useDataTable } from "../dataTable.context";

export const Paging = (
  props: Omit<PaginationProps, "value" | "onChange" | "total">
) => {
  const dataTable = useDataTable();
  const { currentPage, totalPages } = useDataTablePaging();

  console.log("Paging");

  return (
    <Pagination
      {...props}
      value={currentPage}
      onChange={dataTable.setPage}
      total={totalPages}
    />
  );
};
