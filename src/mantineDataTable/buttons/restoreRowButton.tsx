import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { RestoreRowButton as DataTableRestoreRowButton } from '../../lib/dataTable/components/buttons/restoreRowButton';

export const RestoreRowButton = DataTableRestoreRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ restoreRow, isDirty, onClick, disabled, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDirty) restoreRow();
    onClick?.(e);
  };

  return (
    <ActionIcon
      variant="subtle"
      {...props}
      onClick={handleClick}
      disabled={!isDirty || disabled}
    >
      <IconArrowBackUp size={18} stroke={1.5} />
    </ActionIcon>
  );
});
