import { Table } from '@mantine/core';
import { createDataTableCreator } from '../lib';
import { AddRowButton } from './buttons/addRowButton';
import { DeleteRowButton } from './buttons/deleteRowButton';
import { RestoreRowButton } from './buttons/restoreRowButton';
import { UndoButton } from './buttons/undoButton';
import { DataState } from './dataDisplay/dataState';
import { AllRowsSelector } from './inputs/allRowsSelector';
import { Pagination } from './inputs/pagination';
import { RowSelector } from './inputs/rowSelector';
import { SearchInput } from './inputs/searchInput';
import { SortableTh } from './inputs/sortableTh';

export const createMantineThemedDataTable = createDataTableCreator({
  table: Table,
  thead: Table.Thead,
  tbody: Table.Tbody,
  tfoot: Table.Tfoot,
  tr: Table.Tr,
  th: Table.Th,
  td: Table.Td,
  caption: Table.Caption,
  col: 'col',
  colgroup: 'colgroup',
  addRowButton: AddRowButton,
  undoButton: UndoButton,
  deleteRowButton: DeleteRowButton,
  restoreRowButton: RestoreRowButton,
  allRowsSelector: AllRowsSelector,
  rowSelector: RowSelector,
  searchInput: SearchInput,
  pagination: Pagination,
  sortableTh: SortableTh,
  dataState: DataState
});
