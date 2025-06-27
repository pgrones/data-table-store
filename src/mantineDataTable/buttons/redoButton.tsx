import { type ActionIconProps, ActionIcon } from '@mantine/core';
import { useHotkeys } from '@mantine/hooks';
import { IconArrowForwardUp } from '@tabler/icons-react';
import { RedoButton as DataTableRedoButton } from '../../lib/dataTable/components/buttons/redoButton';

export const RedoButton = DataTableRedoButton.as<
  ActionIconProps & React.ComponentProps<'button'>
>(({ redo, canRedo, onClick, disabled, ...props }) => {
  useHotkeys([['mod+Y', () => canRedo && redo()]]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (canRedo) redo();
    onClick?.(e);
  };

  return (
    <ActionIcon
      size="lg"
      variant="subtle"
      {...props}
      onClick={handleClick}
      disabled={!canRedo || disabled}
    >
      <IconArrowForwardUp size={22} stroke={1.5} />
    </ActionIcon>
  );
});
