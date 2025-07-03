import type { RowKey } from '../../../dataTableStore';
import { useRowDeletion } from '../../hooks';
import { useRowContext } from '../dataDisplay';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface DeleteRowButtonProps {
  rowKey: RowKey;
}

export const DeleteRowButton =
  createOverridablePolymorphicComponent<DeleteRowButtonProps>(props => {
    const { rowKey } = useRowContext();

    return (
      <PolymorphicRoot<InjectableComponent<DeleteRowButtonProps>>
        {...props}
        rowKey={rowKey}
      />
    );
  });

export const DefaultDeleteRowButton = DeleteRowButton.as<
  React.ComponentProps<'button'>
>(({ rowKey, ...props }) => {
  const { deleteRow, isDeleted } = useRowDeletion(rowKey);

  return (
    <button type="button" onClick={deleteRow} disabled={isDeleted} {...props}>
      Delete
    </button>
  );
});
