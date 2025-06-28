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

export const AllRowsSelector =
  createOverridablePolymorphicComponent<AllRowsSelectorProps>(props => {
    const { isSelected, indeterminate, toggleAllRowSelections } = useDataTable(
      state => {
        const selectionCount = state.selection.length;

        return {
          isSelected: selectionCount === state.pageSize,
          indeterminate: !!selectionCount && selectionCount !== state.pageSize,
          toggleAllRowSelections: state.toggleAllRowSelections
        };
      }
    );

    return (
      <PolymorphicRoot<InjectableComponent<AllRowsSelectorProps>>
        {...props}
        isSelected={isSelected}
        indeterminate={indeterminate}
        toggleSelection={toggleAllRowSelections}
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
