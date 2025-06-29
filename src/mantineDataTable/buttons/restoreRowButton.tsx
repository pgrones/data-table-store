import {
  RestoreRowButton as DataTableRestoreRowButton,
  useRowRestoration
} from '@lib';
import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons-react';

export const RestoreRowButton = DataTableRestoreRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ rowKey, onClick, ...props }) => {
  const { restoreRow, isDirty } = useRowRestoration(rowKey);

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
