import type { RowKey } from '../../../dataTableStore';
import { useRowDeletion, useRowKey } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface RequiredDeleteRowButtonProps<TEntity extends object = object> {
  row: TEntity;
}

export interface DeleteRowButtonProps {
  rowKey: RowKey;
}

export const DeleteRowButton = createOverridablePolymorphicComponent<
  DeleteRowButtonProps,
  RequiredDeleteRowButtonProps
>(({ row, ...props }) => {
  const rowKey = useRowKey(row);

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
