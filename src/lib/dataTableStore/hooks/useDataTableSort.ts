import { useDataTable } from "../../dataTable/dataTable.context";
import { useSelector } from "../../store/store.hooks";
import { createDataTableSelector } from "./selector";

const selector = createDataTableSelector(
  [(state) => state.sorting, (_, key: string) => key],
  (sorting, key) => {
    const isSorted = sorting?.columnKey === key;

    return {
      isSorted,
      desc: isSorted && !!sorting?.descending,
    };
  }
);

export const useDataTableSort = (key: string) => {
  const store = useDataTable();

  return useSelector(store, selector, key);
};
