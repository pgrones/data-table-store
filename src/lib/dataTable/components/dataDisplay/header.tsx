import { useColumnDimensions } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';
import { useColumnContext } from './column.context';

export interface HeaderProps {
  columnKey: string;
}

export const Header = createOverridablePolymorphicComponent<HeaderProps>(
  props => {
    const { columnKey } = useColumnContext();
    const { width, position } = useColumnDimensions(columnKey);

    return (
      <div
        role="columnheader"
        className="data-table-header"
        style={{ width, gridColumn: position && position + 1 }}
      >
        <PolymorphicRoot<InjectableComponent<HeaderProps>>
          {...props}
          columnKey={columnKey}
        />
      </div>
    );
  }
);

export const DefaultHeader = Header.as<React.ComponentProps<'div'>>(
  ({ columnKey, ...props }) => {
    return <div {...props} />;
  }
);
