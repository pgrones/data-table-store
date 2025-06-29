import { useColumnDimensions } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface RequiredCellProps<TValue = unknown> {
  children:
    | ((props: { value: TValue }) => React.ReactNode)
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
  const { width, spacing } = useColumnDimensions('');

  return (
    <PolymorphicRoot<InjectableComponent<CellProps>>
      {...props}
      cellWidth={150}
      spacing={24}
    />
  );
});

export const DefaultCell = Cell.as<
  Omit<React.ComponentProps<'div'>, 'children'> & RequiredCellProps
>(({ cellWidth, spacing, children, ...props }) => (
  <div
    {...props}
    style={{ ...props.style, width: cellWidth, paddingInline: spacing }}
  />
));
