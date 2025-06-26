import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconTablePlus } from '@tabler/icons-react';
import { AddRowButton as DataTableAddRowButton } from '../../lib/dataTable/components/buttons/addRowButton';

export const AddRowButton = DataTableAddRowButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ addRow, onClick, ...props }) => {
  useHotkeys([['mod+N', addRow]]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    addRow();
    onClick?.(e);
  };

  return (
    <ActionIcon size="lg" {...props} onClick={handleClick}>
      <IconTablePlus size={22} stroke={1.5} />
    </ActionIcon>
  );
});
