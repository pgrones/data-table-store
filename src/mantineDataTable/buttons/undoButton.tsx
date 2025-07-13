import { UndoButton as DataTableUndoButton, useUndo } from '@lib';
import { ActionIcon, Tooltip, type ActionIconProps } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconArrowBackUp } from '@tabler/icons-react';

export const UndoButton = DataTableUndoButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ onClick, disabled, ...props }) => {
  const { undo, canUndo } = useUndo();

  useHotkeys([['mod+Z', () => canUndo && undo()]]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (canUndo) undo();
    onClick?.(e);
  };

  return (
    <Tooltip label="Undo" disabled={!canUndo || disabled}>
      <ActionIcon
        size="lg"
        variant="default"
        {...props}
        onClick={handleClick}
        disabled={!canUndo || disabled}
      >
        <IconArrowBackUp size={22} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
});
