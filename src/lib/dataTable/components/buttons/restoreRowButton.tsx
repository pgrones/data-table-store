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
  RestoreRowButtonProps,
  RequiredRestoreRowButtonProps
>(({ row, ...props }) => {
  const { rowKey, isDirty, restoreRow } = useDataTable(state => {
    const rowKey = state.getKey(row);

    return {
      rowKey,
      restoreRow: state.restoreRow,
      isDirty: state.deleted.includes(rowKey) || rowKey in state.edited
    };
  });

  return (
    <PolymorphicRoot<InjectableComponent<RestoreRowButtonProps>>
      {...props}
      restoreRow={() => restoreRow(rowKey)}
      isDirty={isDirty}
    />
  );
});

export const DefaultRestoreRowButton = RestoreRowButton.as<
  React.ComponentProps<'button'>
>(({ restoreRow, isDirty, ...props }) => (
  <button type="button" onClick={restoreRow} disabled={!isDirty} {...props}>
    Restore
  </button>
));
