import type { Key } from '../../../dataTableStore';
import { useColumnInitialization } from '../../hooks';
import type { RequiredCellProps } from './cell';

export interface ColumnProps<
  TEntity extends object,
  TKey extends Key<TEntity> | (string & {})
> {
  columnId: TKey;
  children: [
    React.ReactElement,
    React.ReactElement<
      RequiredCellProps<TKey extends keyof TEntity ? TEntity[TKey] : unknown>
    >
  ];
  sortable?: boolean;
  resizable?: boolean;
  orderable?: boolean;
  hidable?: boolean;
}

export const createColumn = <TEntity extends object>() => {
  const Column = <TKey extends Key<TEntity> | (string & {})>({
    columnId,
    hidable,
    orderable,
    resizable,
    sortable
  }: ColumnProps<TEntity, TKey>) => {
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

  Column.displayName = 'DataTable.Column';

  return Column;
};
