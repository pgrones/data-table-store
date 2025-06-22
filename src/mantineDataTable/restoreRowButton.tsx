import { ActionIcon, type ActionIconProps } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";
import type { RestoreRowButtonProps } from "../lib/dataTable/components/buttons/restoreRowButton";
import { createDataTableComponent } from "../lib/dataTable/components/polymorphism/createDataTableComponent";

type RestoreRowButtonComponentProps = ActionIconProps &
  React.ComponentProps<"button"> &
  RestoreRowButtonProps;

export const RestoreRowButton = createDataTableComponent(
  ({
    restoreRow,
    isDirty,
    onClick,
    disabled,
    ...props
  }: RestoreRowButtonComponentProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDirty) restoreRow();
      onClick?.(e);
    };

    return (
      <ActionIcon
        variant="subtle"
        {...props}
        onClick={handleClick}
        disabled={!isDirty || disabled}
      >
        <IconArrowBackUp size={18} stroke={1.5} />
      </ActionIcon>
    );
  },
  "RestoreRowButton"
);
