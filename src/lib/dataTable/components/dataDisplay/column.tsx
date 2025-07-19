import type { Key } from '../../../dataTableStore';
import { columnSymbol } from './column.extensions';

export interface ColumnProps<
  TEntity extends object,
  TKey extends Key<Partial<TEntity>> | (string & {}),
  THeaderProps,
  TCellProps
> {
  columnKey: TKey;
  header?: React.ReactNode;
  cell?:
    | React.ReactNode
    | ((props: {
        value: TKey extends keyof TEntity
          ? TEntity[TKey] | undefined
          : undefined;
      }) => React.ReactNode);
  headerProps?: THeaderProps;
  cellProps?: TCellProps;
  defaultWidth?: number | string;
  sortable?: boolean;
  resizable?: boolean;
  orderable?: boolean;
  hidable?: boolean;
  editable?: boolean;
}

export const createColumn = <
  TEntity extends object,
  THeaderProps,
  TCellProps
>() => {
  const Column = <TKey extends Key<TEntity> | (string & {})>(
    _: ColumnProps<TEntity, TKey, THeaderProps, TCellProps>
  ) => {
    // This is really just a config and should not render anything.
    // The DataTable does the rendering
    return null;
  };

  Column.__name = columnSymbol;

  return Column;
};
