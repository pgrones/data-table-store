import { type ActionIconProps, ActionIcon } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconArrowBackUp } from '@tabler/icons-react';
import { UndoButton as DataTableUndoButton } from '../../lib/dataTable/components/buttons/undoButton';

export const UndoButton = DataTableUndoButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ undo, canUndo, onClick, disabled, ...props }) => {
  useHotkeys([['mod+Z', () => canUndo && undo()]]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (canUndo) undo();
    onClick?.(e);
  };

  return (
    <ActionIcon
      size="lg"
      {...props}
      onClick={handleClick}
      disabled={!canUndo || disabled}
    >
      <IconArrowBackUp size={22} stroke={1.5} />
    </ActionIcon>
  );
});
