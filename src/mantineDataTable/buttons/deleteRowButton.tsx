import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { DeleteRowButton as DataTableDeleteRowButton } from '../../lib/dataTable/components/buttons/deleteRowButton';

export const DeleteRowButton = DataTableDeleteRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ deleteRow, isDeleted, onClick, disabled, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDeleted) deleteRow();
    onClick?.(e);
  };

  return (
    <ActionIcon
      variant="subtle"
      color="red"
      {...props}
      onClick={handleClick}
      disabled={isDeleted || disabled}
    >
      <IconTrash size={18} stroke={1.5} />
    </ActionIcon>
  );
});
