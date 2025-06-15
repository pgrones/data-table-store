import { DataTableProvider } from "./data-table/dataTableStore.context";
import { DataTable } from "./table";

export type User = { id: string; name: string };

export const App = () => {
  return (
    <DataTableProvider
      {...{
        initialRows: [
          { id: "1", name: "asdf" },
          { id: "2", name: "ghjk" },
        ],
        rowKey: "id",
        pageSize: 5,
        totalEntities: 20,
      }}
    >
      <main style={{ padding: 40 }}>
        <DataTable />
      </main>
    </DataTableProvider>
  );
};
