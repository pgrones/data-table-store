import { ActionIcon, type ActionIconProps } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import type { DeleteRowButtonProps } from "../lib/dataTable/components/buttons/deleteRowButton";
import { createDataTableComponent } from "../lib/dataTable/components/polymorphism/createDataTableComponent";

type DeleteRowButtonComponentProps = ActionIconProps &
  React.ComponentProps<"button"> &
  DeleteRowButtonProps;

export const DeleteRowButton = createDataTableComponent(
  ({
    deleteRow,
    isDeleted,
    onClick,
    disabled,
    ...props
  }: DeleteRowButtonComponentProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isDeleted) deleteRow();
      onClick?.(e);
    };

    return (
      <ActionIcon
        variant="subtle"
        color="red"
        {...props}
        onClick={handleClick}
        disabled={isDeleted || disabled}
      >
        <IconTrash size={18} stroke={1.5} />
      </ActionIcon>
    );
  },
  "DeleteRowButton"
);
