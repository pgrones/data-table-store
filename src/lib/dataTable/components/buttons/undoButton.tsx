import { useDataTableUndoState } from '../../hooks';
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

export const UndoButton = createOverridablePolymorphicComponent<
  'button',
  UndoButtonProps
>(props => {
  const dataTable = useDataTable();
  const canUndo = useDataTableUndoState();

  return (
    <PolymorphicRoot<InjectableComponent<UndoButtonProps>>
      {...props}
      undo={dataTable.undo}
      canUndo={canUndo}
    />
  );
});

export const DefaultUndoButton = UndoButton.as<React.ComponentProps<'button'>>(
  ({ undo, canUndo, ...props }) => (
    <button onClick={undo} disabled={!canUndo} {...props}>
      Undo
    </button>
  )
);
