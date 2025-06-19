import { Table } from "@mantine/core";
import { useDataTableData } from "../../dataTableStore/hooks/useDataTableData";

interface RowsProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
}

export const Rows = <TEntity extends object>({
  children,
}: RowsProps<TEntity>) => {
  const data = useDataTableData<TEntity>();

  console.log("Rows");

  return data.map(({ key, ...row }) => (
    <Table.Tr key={key}>{children(row as TEntity)}</Table.Tr>
  ));
};
