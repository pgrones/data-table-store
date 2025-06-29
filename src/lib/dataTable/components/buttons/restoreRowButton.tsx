import type { RowKey } from '../../../dataTableStore';
import { useRowKey, useRowRestoration } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface RequiredRestoreRowButtonProps<
  TEntity extends object = object
> {
  row: TEntity;
}

export interface RestoreRowButtonProps {
  rowKey: RowKey;
}

export const RestoreRowButton = createOverridablePolymorphicComponent<
  RestoreRowButtonProps,
  RequiredRestoreRowButtonProps
>(({ row, ...props }) => {
  const rowKey = useRowKey(row);

  return (
    <PolymorphicRoot<InjectableComponent<RestoreRowButtonProps>>
      {...props}
      rowKey={rowKey}
    />
  );
});

export const DefaultRestoreRowButton = RestoreRowButton.as<
  React.ComponentProps<'button'>
>(({ rowKey, ...props }) => {
  const { restoreRow, isDirty } = useRowRestoration(rowKey);

  return (
    <button type="button" onClick={restoreRow} disabled={!isDirty} {...props}>
      Restore
    </button>
  );
});
