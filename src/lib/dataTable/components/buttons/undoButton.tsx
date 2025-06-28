import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface UndoButtonProps {
  undo: () => void;
  canUndo: boolean;
}

export const UndoButton =
  createOverridablePolymorphicComponent<UndoButtonProps>(props => {
    const { undo, canUndo } = useDataTable(state => ({
      undo: state.undo,
      canUndo: !!state.history.length
    }));

    return (
      <PolymorphicRoot<InjectableComponent<UndoButtonProps>>
        {...props}
        undo={undo}
        canUndo={canUndo}
      />
    );
  });

export const DefaultUndoButton = UndoButton.as<React.ComponentProps<'button'>>(
  ({ undo, canUndo, ...props }) => (
    <button type="button" onClick={undo} disabled={!canUndo} {...props}>
      Undo
    </button>
  )
);
