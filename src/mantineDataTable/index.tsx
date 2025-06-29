import { createDataTableCreator } from '@lib';
import { Table } from '@mantine/core';
import { AddRowButton } from './buttons/addRowButton';
import { DeleteRowButton } from './buttons/deleteRowButton';
import { RedoButton } from './buttons/redoButton';
import { RestoreRowButton } from './buttons/restoreRowButton';
import { UndoButton } from './buttons/undoButton';
import { DataState } from './dataDisplay/dataState';
import { Th } from './dataDisplay/th';
import { AllRowsSelector } from './inputs/allRowsSelector';
import { Pagination } from './inputs/pagination';
import { RowSelector } from './inputs/rowSelector';
import { SearchInput } from './inputs/searchInput';

export const createMantineThemedDataTable = createDataTableCreator({
  table: Table,
  thead: Table.Thead,
  tbody: Table.Tbody,
  tfoot: Table.Tfoot,
  tr: Table.Tr,
  th: Th,
  td: Table.Td,
  caption: Table.Caption,
  col: 'col',
  colgroup: 'colgroup',
  addRowButton: AddRowButton,
  undoButton: UndoButton,
  redoButton: RedoButton,
  deleteRowButton: DeleteRowButton,
  restoreRowButton: RestoreRowButton,
  allRowsSelector: AllRowsSelector,
  rowSelector: RowSelector,
  searchInput: SearchInput,
  pagination: Pagination,
  additionalCompoundComponents: {
    DataState
  }
});
