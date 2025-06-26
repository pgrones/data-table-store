import { useDataTableSelection } from '../../hooks';
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
  'input',
  RowSelectorProps,
  RequiredRowSelectorProps
>(({ row, ...props }) => {
  const dataTable = useDataTable();
  const rowKey = dataTable.getKey(row);
  const isSelected = useDataTableSelection(rowKey);

  return (
    <PolymorphicRoot<InjectableComponent<RowSelectorProps>>
      {...props}
      isSelected={isSelected}
      toggleSelection={() => dataTable.toggleRowSelection(rowKey)}
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
