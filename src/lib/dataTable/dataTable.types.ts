export interface DataTableComponents<TCompoundMap extends object> {
  table?: React.ElementType;
  thead?: React.ElementType;
  tbody?: React.ElementType;
  tfoot?: React.ElementType;
  tr?: React.ElementType;
  td?: React.ElementType;
  th?: React.ElementType;
  caption?: React.ElementType;
  colgroup?: React.ElementType;
  col?: React.ElementType;
  rowSelector?: React.ElementType;
  allRowsSelector?: React.ElementType;
  searchInput?: React.ElementType;
  pagination?: React.ElementType;
  dataState?: React.ElementType;
  addRowButton?: React.ElementType;
  deleteRowButton?: React.ElementType;
  restoreRowButton?: React.ElementType;
  undoButton?: React.ElementType;
  redoButton?: React.ElementType;
  sortableTh?: React.ElementType;
  additionalCompoundComponents?: TCompoundMap;
}

export type WithProps<
  T extends React.ElementType,
  P
> = T extends React.ComponentType<infer Props>
  ? (props: Omit<Props, keyof P> & P) => React.ReactElement
  : never;

export type TypedElement<C extends React.ElementType, TTypedProps> = WithProps<
  C,
  TTypedProps
>;
