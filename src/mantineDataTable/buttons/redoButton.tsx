import { RedoButton as DataTableRedoButton, useRedo } from '@lib';
import { ActionIcon, Tooltip, type ActionIconProps } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconArrowForwardUp } from '@tabler/icons-react';

export const RedoButton = DataTableRedoButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ onClick, disabled, ...props }) => {
  const { redo, canRedo } = useRedo();

  useHotkeys([['mod+Y', () => canRedo && redo()]]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (canRedo) redo();
    onClick?.(e);
  };

  return (
    <Tooltip label="Redo" disabled={!canRedo || disabled}>
      <ActionIcon
        size="lg"
        variant="default"
        {...props}
        onClick={handleClick}
        disabled={!canRedo || disabled}
      >
        <IconArrowForwardUp size={22} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
});
