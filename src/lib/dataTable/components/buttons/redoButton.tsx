import { useDataTableRedoState } from '../../hooks';
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

export const RedoButton = createOverridablePolymorphicComponent<
  'button',
  RedoButtonProps
>(props => {
  const dataTable = useDataTable();
  const canRedo = useDataTableRedoState();

  return (
    <PolymorphicRoot<InjectableComponent<RedoButtonProps>>
      {...props}
      redo={dataTable.redo}
      canRedo={canRedo}
    />
  );
});

export const DefaultRedoButton = RedoButton.as<React.ComponentProps<'button'>>(
  ({ redo, canRedo, ...props }) => (
    <button onClick={redo} disabled={!canRedo} {...props}>
      Redo
    </button>
  )
);
