import type { Key } from '../../../dataTableStore';
import { useColumnInitialization } from '../../hooks';
import type { RequiredCellProps } from './cell';
import { columnSymbol } from './column.extensions';

export interface ColumnProps<TEntity extends object> {
  columnId: Key<TEntity> | (string & {});
  children: [React.ReactElement, React.ReactElement<RequiredCellProps>];
  sortable?: boolean;
  resizable?: boolean;
  orderable?: boolean;
  hidable?: boolean;
}

export const createColumn = <TEntity extends object>() => {
  const Column = ({
    columnId,
    hidable,
    orderable,
    resizable,
    sortable
  }: ColumnProps<TEntity>) => {
    useColumnInitialization(columnId, {
      isHidable: hidable,
      isOrderable: orderable,
      isResizable: resizable,
      isSortable: sortable
    });

    // This is really just a config and should not render anything.
    // The DataTable does the rendering
    return null;
  };

  Column.__name = columnSymbol;

  return Column;
};
