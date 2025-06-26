import {
  useDataTableDeletedState,
  useDataTableEditedState
} from '../../hooks/useDataTableDataState';
import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface RequiredRestoreRowButtonProps<
  TEntity extends object = object
> {
  row: TEntity;
}

export interface RestoreRowButtonProps {
  restoreRow: () => void;
  isDirty: boolean;
}

export const RestoreRowButton = createOverridablePolymorphicComponent<
  'button',
  RestoreRowButtonProps,
  RequiredRestoreRowButtonProps
>(({ row, ...props }) => {
  const dataTable = useDataTable();
  const rowKey = dataTable.getKey(row);
  const isDeleted = useDataTableDeletedState(rowKey);
  const isEdited = useDataTableEditedState(rowKey);

  return (
    <PolymorphicRoot<InjectableComponent<RestoreRowButtonProps>>
      {...props}
      restoreRow={() => dataTable.restoreRow(rowKey)}
      isDirty={isDeleted || isEdited}
    />
  );
});

export const DefaultRestoreRowButton = RestoreRowButton.as<
  React.ComponentProps<'button'>
>(({ restoreRow, isDirty, ...props }) => (
  <button onClick={restoreRow} disabled={!isDirty} {...props}>
    Restore
  </button>
));
