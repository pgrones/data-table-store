import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { DeleteRowButton as DataTableDeleteRowButton } from '../../lib/dataTable/components/buttons/deleteRowButton';

export const DeleteRowButton = DataTableDeleteRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ deleteRow, isDeleted, onClick, ...props }) => {
  if (isDeleted) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteRow();
    onClick?.(e);
  };

  return (
    <ActionIcon variant="subtle" color="red" {...props} onClick={handleClick}>
      <IconTrash size={18} stroke={1.5} />
    </ActionIcon>
  );
});
