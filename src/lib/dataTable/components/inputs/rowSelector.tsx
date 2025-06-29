import type { RowKey } from '../../../dataTableStore';
import { useRowKey, useRowSelection } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface RequiredRowSelectorProps<TEntity extends object = object> {
  row: TEntity;
}

export interface RowSelectorProps {
  rowKey: RowKey;
}

export const RowSelector = createOverridablePolymorphicComponent<
  RowSelectorProps,
  RequiredRowSelectorProps
>(({ row, ...props }) => {
  const rowKey = useRowKey(row);

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
