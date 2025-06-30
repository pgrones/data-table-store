import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';
import { cellSymbol } from './cell.extensions';

export interface RequiredCellProps {
  __value?: unknown;
  children:
    | ((props: { value: unknown }) => React.ReactNode)
    | React.ReactNode
    | null
    | undefined;
}

export interface CellProps {
  cellWidth: number;
  spacing: string | number;
}

export const Cell = createOverridablePolymorphicComponent<
  CellProps,
  RequiredCellProps
>(props => {
  return (
    <PolymorphicRoot<InjectableComponent<CellProps>>
      {...props}
      cellWidth={150}
      spacing={24}
    />
  );
});

Cell.__name = cellSymbol;

export const DefaultCell = Cell.as<
  Omit<React.ComponentProps<'div'>, 'children'> & RequiredCellProps
>(({ cellWidth, spacing, children, ...props }) => (
  <div
    {...props}
    style={{ ...props.style, width: cellWidth, paddingInline: spacing }}
  />
));
