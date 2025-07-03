import type { RowKey } from '../../../dataTableStore';
import { useRowRestoration } from '../../hooks';
import { useRowContext } from '../dataDisplay';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';

export interface RestoreRowButtonProps {
  rowKey: RowKey;
}

export const RestoreRowButton =
  createOverridablePolymorphicComponent<RestoreRowButtonProps>(props => {
    const { rowKey } = useRowContext();

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
