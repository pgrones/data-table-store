import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface AddRowButtonProps {
  addRow: () => void;
}

export const AddRowButton = createOverridablePolymorphicComponent<
  'button',
  AddRowButtonProps
>(props => {
  const addRow = useDataTable(state => state.addRow);

  return (
    <PolymorphicRoot<InjectableComponent<AddRowButtonProps>>
      {...props}
      addRow={addRow}
    />
  );
});

export const DefaultAddRowButton = AddRowButton.as<
  React.ComponentProps<'button'>
>(({ addRow, ...props }) => (
  <button type="button" onClick={addRow} {...props}>
    Add Row
  </button>
));
