import { memo } from 'react';

export interface DataTableComponents<TCompoundMap extends object> {
  cell?: React.ElementType;
  header?: React.ElementType;
  column?: React.ElementType;
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

export type WithProps<T extends React.ElementType, P> =
  T extends React.ComponentType<infer Props>
    ? (props: Omit<Props, keyof P> & P) => React.ReactElement | null | undefined
    : never;

export type TypedElement<C extends React.ElementType, TTypedProps> = WithProps<
  C,
  TTypedProps
>;

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
