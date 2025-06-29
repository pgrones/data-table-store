import { useRowCreation } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';

export const AddRowButton = createOverridablePolymorphicComponent(props => (
  <PolymorphicRoot {...props} />
));

export const DefaultAddRowButton = AddRowButton.as<
  React.ComponentProps<'button'>
>(props => {
  const addRow = useRowCreation();

  return (
    <button type="button" onClick={addRow} {...props}>
      Add Row
    </button>
  );
});
