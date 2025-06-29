import {
  DeleteRowButton as DataTableDeleteRowButton,
  useRowDeletion
} from '@lib';
import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export const DeleteRowButton = DataTableDeleteRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ rowKey, onClick, ...props }) => {
  const { deleteRow, isDeleted } = useRowDeletion(rowKey);

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
