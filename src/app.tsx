import { DataTableProvider, DataTableStore } from "./lib";
import { EditableTable } from "./table";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  birthday: Date;
};

const store = new DataTableStore();

export const App = () => {
  return (
    <DataTableProvider store={store}>
      <EditableTable />
    </DataTableProvider>
  );
};
