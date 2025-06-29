import { useAllRowsSelection } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';

export const AllRowsSelector = createOverridablePolymorphicComponent(props => (
  <PolymorphicRoot {...props} />
));

export const DefaultAllRowsSelector = AllRowsSelector.as<
  React.ComponentProps<'input'>
>(props => {
  const { toggleAllRowSelections, isSelected } = useAllRowsSelection();

  return (
    <input
      type="checkbox"
      {...props}
      checked={isSelected}
      onChange={toggleAllRowSelections}
    />
  );
});
