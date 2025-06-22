import { type ActionIconProps, ActionIcon } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";
import React from "react";
import type { UndoButtonProps } from "../lib/dataTable/components/buttons/undoButton";
import { createDataTableComponent } from "../lib/dataTable/components/polymorphism/createDataTableComponent";
import { useHotkeys } from "@mantine/hooks";

type UndoButtonComponentProps = ActionIconProps &
  React.ComponentProps<"button"> &
  UndoButtonProps;

export const UndoButton = createDataTableComponent(
  ({
    undo,
    canUndo,
    onClick,
    disabled,
    ...props
  }: UndoButtonComponentProps) => {
    useHotkeys([["mod+Z", () => canUndo && undo()]]);

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
  },
  "UndoButton"
);
