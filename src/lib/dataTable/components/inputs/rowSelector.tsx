import type { RowKey } from '../../../dataTableStore';
import { useRowSelection } from '../../hooks';
import { useRowContext } from '../dataDisplay';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface RowSelectorProps {
  rowKey: RowKey;
}

export const RowSelector =
  createOverridablePolymorphicComponent<RowSelectorProps>(props => {
    const { rowKey } = useRowContext();

    return (
      <PolymorphicRoot<InjectableComponent<RowSelectorProps>>
        {...props}
        rowKey={rowKey}
      />
    );
  });

export const DefaultRowSelector = RowSelector.as<React.ComponentProps<'input'>>(
  ({ rowKey, ...props }) => {
    const { toggleRowSelection, isSelected } = useRowSelection(rowKey);

    return (
      <input
        type="checkbox"
        {...props}
        checked={isSelected}
        onChange={toggleRowSelection}
      />
    );
  }
);
