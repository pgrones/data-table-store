import { useRedo } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';

export const RedoButton = createOverridablePolymorphicComponent(props => (
  <PolymorphicRoot {...props} />
));

export const DefaultRedoButton = RedoButton.as<React.ComponentProps<'button'>>(
  props => {
    const { redo, canRedo } = useRedo();

    return (
      <button type="button" onClick={redo} disabled={!canRedo} {...props}>
        Redo
      </button>
    );
  }
);
