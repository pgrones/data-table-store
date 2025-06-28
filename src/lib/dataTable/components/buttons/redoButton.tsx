import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface RedoButtonProps {
  redo: () => void;
  canRedo: boolean;
}

export const RedoButton =
  createOverridablePolymorphicComponent<RedoButtonProps>(props => {
    const { redo, canRedo } = useDataTable(state => ({
      redo: state.redo,
      canRedo: !!state.undoHistory.length
    }));

    return (
      <PolymorphicRoot<InjectableComponent<RedoButtonProps>>
        {...props}
        redo={redo}
        canRedo={canRedo}
      />
    );
  });

export const DefaultRedoButton = RedoButton.as<React.ComponentProps<'button'>>(
  ({ redo, canRedo, ...props }) => (
    <button type="button" onClick={redo} disabled={!canRedo} {...props}>
      Redo
    </button>
  )
);
