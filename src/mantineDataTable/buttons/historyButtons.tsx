import { ActionIcon, type ActionIconProps } from '@mantine/core';
import { RedoButton } from './redoButton';
import { UndoButton } from './undoButton';

type HistoryButtonsProps = ActionIconProps & React.ComponentProps<'button'>;

export const HistoryButtons = (props: HistoryButtonsProps) => {
  return (
    <ActionIcon.Group>
      <UndoButton {...props} />
      <RedoButton {...props} />
    </ActionIcon.Group>
  );
};
