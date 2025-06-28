import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface RequiredRowSelectorProps<TEntity extends object = object> {
  row: TEntity;
}

export interface RowSelectorProps {
  isSelected: boolean;
  toggleSelection: () => void;
}

export const RowSelector = createOverridablePolymorphicComponent<
  RowSelectorProps,
  RequiredRowSelectorProps
>(({ row, ...props }) => {
  const { rowKey, isSelected, toggleRowSelection } = useDataTable(state => {
    const rowKey = state.getKey(row);

    return {
      rowKey,
      isSelected: state.selection.includes(rowKey),
      toggleRowSelection: state.toggleRowSelection
    };
  });

  return (
    <PolymorphicRoot<InjectableComponent<RowSelectorProps>>
      {...props}
      isSelected={isSelected}
      toggleSelection={() => toggleRowSelection(rowKey)}
    />
  );
});

export const DefaultRowSelector = RowSelector.as<React.ComponentProps<'input'>>(
  ({ isSelected, toggleSelection, ...props }) => (
    <input
      type="checkbox"
      {...props}
      checked={isSelected}
      onChange={toggleSelection}
    />
  )
);
