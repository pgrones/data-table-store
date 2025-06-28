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
  DeleteRowButtonProps,
  RequiredDeleteRowButtonProps
>(({ row, ...props }) => {
  const { deleteRow, isDeleted, rowKey } = useDataTable(state => ({
    rowKey: state.getKey(row),
    deleteRow: state.deleteRow,
    isDeleted: state.deleted.includes(state.getKey(row))
  }));

  return (
    <PolymorphicRoot<InjectableComponent<DeleteRowButtonProps>>
      {...props}
      deleteRow={() => deleteRow(rowKey)}
      isDeleted={isDeleted}
    />
  );
});

export const DefaultDeleteRowButton = DeleteRowButton.as<
  React.ComponentProps<'button'>
>(({ deleteRow, isDeleted, ...props }) => (
  <button type="button" onClick={deleteRow} disabled={isDeleted} {...props}>
    Delete
  </button>
));
