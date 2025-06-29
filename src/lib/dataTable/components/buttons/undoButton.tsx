import { useUndo } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';

export const UndoButton = createOverridablePolymorphicComponent(props => {
  return <PolymorphicRoot {...props} />;
});

export const DefaultUndoButton = UndoButton.as<React.ComponentProps<'button'>>(
  props => {
    const { undo, canUndo } = useUndo();

    return (
      <button type="button" onClick={undo} disabled={!canUndo} {...props}>
        Undo
      </button>
    );
  }
);
