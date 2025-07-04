import { memo } from 'react';
import type { CellProps, HeaderProps } from './components';

export interface DataTableComponents<TCompoundMap extends object> {
  cell?: React.ComponentType<CellProps>;
  header?: React.ComponentType<React.PropsWithChildren<HeaderProps>>;
  rowSelector?: React.ElementType;
  allRowsSelector?: React.ElementType;
  searchInput?: React.ElementType;
  pagination?: React.ElementType;
  addRowButton?: React.ElementType;
  deleteRowButton?: React.ElementType;
  restoreRowButton?: React.ElementType;
  undoButton?: React.ElementType;
  redoButton?: React.ElementType;
  additionalCompoundComponents?: TCompoundMap;
}

type TypedMemo = <
  TComponent extends (
    props: React.ComponentProps<TComponent>
  ) => React.ReactNode
>(
  Component: TComponent,
  propsAreEqual?: Parameters<typeof memo>[1]
) => TComponent;

export const typedMemo: TypedMemo = (Component, propsAreEqual) =>
  memo(Component, propsAreEqual) as unknown as typeof Component;
