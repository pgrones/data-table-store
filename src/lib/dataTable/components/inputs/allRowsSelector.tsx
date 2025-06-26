import { useDataTableSelectionAll } from '../../hooks';
import { useDataTable } from '../../index';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface AllRowsSelectorProps {
  isSelected: boolean;
  indeterminate: boolean;
  toggleSelection: () => void;
}

export const AllRowsSelector = createOverridablePolymorphicComponent<
  'input',
  AllRowsSelectorProps
>(props => {
  const dataTable = useDataTable();
  const { isSelected, indeterminate } = useDataTableSelectionAll();

  return (
    <PolymorphicRoot<InjectableComponent<AllRowsSelectorProps>>
      {...props}
      isSelected={isSelected}
      indeterminate={indeterminate}
      toggleSelection={dataTable.toggleAllRowSelections}
    />
  );
});

export const DefaultAllRowsSelector = AllRowsSelector.as<
  React.ComponentProps<'input'>
>(({ isSelected, toggleSelection, indeterminate: _, ...props }) => (
  <input
    type="checkbox"
    {...props}
    checked={isSelected}
    onChange={toggleSelection}
  />
));
