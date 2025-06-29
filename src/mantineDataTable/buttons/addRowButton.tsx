import { AddRowButton as DataTableAddRowButton, useRowCreation } from '@lib';
import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconTablePlus } from '@tabler/icons-react';

export const AddRowButton = DataTableAddRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ onClick, ...props }) => {
  const addRow = useRowCreation();

  useHotkeys([['mod+N', addRow]]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRow();
    onClick?.(e);
  };

  return (
    <ActionIcon size="lg" variant="subtle" {...props} onClick={handleClick}>
      <IconTablePlus size={22} stroke={1.5} />
    </ActionIcon>
  );
});
