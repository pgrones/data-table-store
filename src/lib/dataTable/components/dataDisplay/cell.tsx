import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface CellProps {
  value: React.ReactNode;
}

export const Cell = createOverridablePolymorphicComponent<CellProps>(
  ({ value, ...props }: { value?: React.ReactNode }) => (
    <PolymorphicRoot<InjectableComponent<CellProps>> {...props} value={value} />
  )
);

export const DefaultCell = Cell.as<React.ComponentProps<'div'>>(
  ({ value, ...props }) => {
    return <div {...props}>{value}</div>;
  }
);
