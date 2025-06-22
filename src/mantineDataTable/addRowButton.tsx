import { ActionIcon, type ActionIconProps } from "@mantine/core";
import { IconTablePlus } from "@tabler/icons-react";
import React from "react";
import type { AddRowButtonProps } from "../lib/dataTable/components/buttons/addRowButton";
import { createDataTableComponent } from "../lib/dataTable/components/polymorphism/createDataTableComponent";
import { useHotkeys } from "@mantine/hooks";

type AddRowButtonComponentProps = ActionIconProps &
  React.ComponentProps<"button"> &
  AddRowButtonProps;

export const AddRowButton = createDataTableComponent(
  ({ addRow, onClick, ...props }: AddRowButtonComponentProps) => {
    useHotkeys([["mod+N", addRow]]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      addRow();
      onClick?.(e);
    };

    return (
      <ActionIcon size="lg" {...props} onClick={handleClick}>
        <IconTablePlus size={22} stroke={1.5} />
      </ActionIcon>
    );
  },
  "AddRowButton"
);
