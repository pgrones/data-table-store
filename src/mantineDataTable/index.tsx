import { createDataTableCreator } from '@lib';
import { AddRowButton } from './buttons/addRowButton';
import { DeleteRowButton } from './buttons/deleteRowButton';
import { RedoButton } from './buttons/redoButton';
import { RestoreRowButton } from './buttons/restoreRowButton';
import { UndoButton } from './buttons/undoButton';
import { Cell } from './dataDisplay/cell';
import { DataState } from './dataDisplay/dataState';
import { Header, HeaderLabel } from './dataDisplay/header/header';
import { OrderableContext } from './dataDisplay/header/ordering/orderableContext';
import { AllRowsSelector } from './inputs/allRowsSelector';
import { Pagination } from './inputs/pagination';
import { RowSelector } from './inputs/rowSelector';
import { SearchInput } from './inputs/searchInput';

export const createMantineThemedDataTable = createDataTableCreator(
  {
    stickyHeader: true,
    highlightOnHover: true,
    highlightOnSelect: true,
    horizontalSpacing: 'var(--mantine-spacing-md)',
    verticalSpacing: 'var(--mantine-spacing-md)',
    borderColor: 'var(--mantine-color-default-border)',
    stripedColor: 'var(--mantine-color-default)',
    hoverColor: 'var(--mantine-primary-color-light-hover)',
    selectedColor: 'var(--mantine-primary-color-light)'
  },
  {
    header: Header,
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
      DataState,
      HeaderLabel,
      OrderableContext
    }
  }
);
