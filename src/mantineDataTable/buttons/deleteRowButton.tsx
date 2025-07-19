import {
  DeleteRowButton as DataTableDeleteRowButton,
  useRowDeletion,
  useRowRestoration
} from '@lib';
import { ActionIcon, Tooltip, type ActionIconProps } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';

export const DeleteRowButton = DataTableDeleteRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ rowKey, onClick, ...props }) => {
  const { deleteRow } = useRowDeletion(rowKey);
  const { isDirty } = useRowRestoration(rowKey);

  if (isDirty) return null;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    deleteRow();
    onClick?.(e);
  };

  return (
    <Tooltip label="Delete Row">
      <ActionIcon variant="subtle" color="red" {...props} onClick={handleClick}>
        <IconTrash size={18} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
});
