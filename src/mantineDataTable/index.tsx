import { Table } from "@mantine/core";
import { createDataTableCreator } from "../lib";
import { AddRowButton } from "./addRowButton";
import { UndoButton } from "./undoButton";
import { RestoreRowButton } from "./restoreRowButton";
import { DeleteRowButton } from "./deleteRowButton";
import { Search } from "./search";

export const createMantineDataTable = createDataTableCreator({
  table: Table,
  thead: Table.Thead,
  tbody: Table.Tbody,
  tfoot: Table.Tfoot,
  tr: Table.Tr,
  th: Table.Th,
  td: Table.Td,
  caption: Table.Caption,
  col: "col",
  colgroup: "colgroup",
  addRowButton: AddRowButton,
  undoButton: UndoButton,
  deleteRowButton: DeleteRowButton,
  restoreRowButton: RestoreRowButton,
  search: Search,
});
