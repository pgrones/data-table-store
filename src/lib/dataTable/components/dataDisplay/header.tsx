import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface HeaderProps {
  columnKey: string;
}

export const Header = createOverridablePolymorphicComponent<HeaderProps>(
  ({ columnKey, ...props }: { columnKey?: string }) => {
    if (!columnKey) throw new Error('columnKey has not been provided');

    return (
      <PolymorphicRoot<InjectableComponent<HeaderProps>>
        {...props}
        columnKey={columnKey}
      />
    );
  }
);

export const DefaultHeader = Header.as<React.ComponentProps<'div'>>(
  ({ columnKey, ...props }) => {
    return <div {...props} />;
  }
);
