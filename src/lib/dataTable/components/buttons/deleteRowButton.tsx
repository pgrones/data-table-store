import { useDataTableDeletedState } from '../../hooks';
import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface RequiredDeleteRowButtonProps<TEntity extends object = object> {
  row: TEntity;
}

export interface DeleteRowButtonProps {
  deleteRow: () => void;
  isDeleted: boolean;
}

export const DeleteRowButton = createOverridablePolymorphicComponent<
  'button',
  DeleteRowButtonProps,
  RequiredDeleteRowButtonProps
>(({ row, ...props }) => {
  const dataTable = useDataTable();
  const rowKey = dataTable.getKey(row);
  const isDeleted = useDataTableDeletedState(rowKey);

  return (
    <PolymorphicRoot<InjectableComponent<DeleteRowButtonProps>>
      {...props}
      deleteRow={() => dataTable.deleteRow(rowKey)}
      isDeleted={isDeleted}
    />
  );
});

export const DefaultDeleteRowButton = DeleteRowButton.as<
  React.ComponentProps<'button'>
>(({ deleteRow, isDeleted, ...props }) => (
  <button onClick={deleteRow} disabled={isDeleted} {...props}>
    Delete
  </button>
));
