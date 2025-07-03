import { createDataTableCreator } from '@lib';
import { AddRowButton } from './buttons/addRowButton';
import { DeleteRowButton } from './buttons/deleteRowButton';
import { RedoButton } from './buttons/redoButton';
import { RestoreRowButton } from './buttons/restoreRowButton';
import { UndoButton } from './buttons/undoButton';
import { Cell } from './dataDisplay/cell';
import { DataState } from './dataDisplay/dataState';
import { AllRowsSelector } from './inputs/allRowsSelector';
import { Pagination } from './inputs/pagination';
import { RowSelector } from './inputs/rowSelector';
import { SearchInput } from './inputs/searchInput';

export const createMantineThemedDataTable = createDataTableCreator({
  cell: Cell,
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
