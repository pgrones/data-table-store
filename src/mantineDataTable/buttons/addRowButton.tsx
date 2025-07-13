import { AddRowButton as DataTableAddRowButton, useRowCreation } from '@lib';
import { ActionIcon, Tooltip, type ActionIconProps } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconTablePlus } from '@tabler/icons-react';

export const AddRowButton = DataTableAddRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ onClick, ...props }) => {
  const addRow = useRowCreation();

  useHotkeys([['mod+alt+N', addRow]]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRow();
    onClick?.(e);
  };

  return (
    <Tooltip label="Add Row">
      <ActionIcon size="lg" variant="default" {...props} onClick={handleClick}>
        <IconTablePlus size={22} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
});
