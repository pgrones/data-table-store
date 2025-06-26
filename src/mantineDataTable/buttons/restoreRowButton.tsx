import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';
import { RestoreRowButton as DataTableRestoreRowButton } from '../../lib/dataTable/components/buttons/restoreRowButton';

export const RestoreRowButton = DataTableRestoreRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ restoreRow, isDirty, onClick, ...props }) => {
  if (!isDirty) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    restoreRow();
    onClick?.(e);
  };

  return (
    <ActionIcon variant="subtle" {...props} onClick={handleClick}>
      <IconArrowBackUp size={18} stroke={1.5} />
    </ActionIcon>
  );
});
