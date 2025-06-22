import {
  CloseButton,
  Kbd,
  TextInput,
  type TextInputProps,
} from "@mantine/core";
import { useHotkeys, useMergedRef, useUncontrolled } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import React, { useRef } from "react";

export interface SearchInputProps
  extends Omit<
    TextInputProps,
    "value" | "onChange" | "defaultValue" | "placeholder"
  > {
  /** Default value for uncontrolled inputs */
  defaultValue?: string;
  /** Value for controlled inputs */
  value?: string;
  /** onChange listener for controlled inputs */
  onChange?: (
    value: string | React.ChangeEvent<HTMLInputElement> | null | undefined
  ) => void;
  /** Hotkey to focus the input. Defaults to `mod+J` */
  hotkey?: string;
  /** Label to show key combination on the input. Defaults to `STRG+J` */
  hotKeyLabel?: string;
  /** Placeholder inside the input */
  placeholder?: string;
  ref?: React.Ref<HTMLInputElement>;
}

/** TextInput designed for searches. Handles hotkeys and has an option to clear the entire input */
export const SearchInput = ({
  defaultValue,
  value,
  onChange,
  placeholder = "Suchen...",
  hotkey = "mod+J",
  hotKeyLabel = "STRG+J",
  children: _,
  ref,
  ...props
}: SearchInputProps) => {
  const searchRef = useRef<HTMLInputElement>(null);
  const mergedRef = useMergedRef(searchRef, ref);

  useHotkeys([
    [
      hotkey,
      () => {
        searchRef.current?.focus();
        searchRef.current?.select();
      },
    ],
  ]);

  const [_value, handleChange] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange,
  });

  return (
    <TextInput
      type="search"
      placeholder={placeholder}
      value={_value}
      onChange={(event) => handleChange(event.currentTarget.value)}
      ref={mergedRef}
      leftSection={<IconSearch size={18} stroke={1.5} />}
      rightSection={
        _value ? (
          <ClearButton onClear={() => handleChange("")} />
        ) : (
          <>
            {hotKeyLabel.split("+").map((x, i, arr) => (
              <div key={x}>
                <Kbd>{x}</Kbd>
                {i !== arr.length - 1 ? "+" : null}
              </div>
            ))}
          </>
        )
      }
      rightSectionProps={{
        style: {
          justifyContent: "flex-end",
          paddingInline: _value ? "0.45rem" : "var(--mantine-spacing-xs)",
          width: _value ? "calc(var(--mantine-spacing-xs) * 2 + 15px)" : "auto",
        },
      }}
      rightSectionPointerEvents={_value ? "all" : "none"}
      leftSectionPointerEvents="none"
      {...props}
    />
  );
};

const ClearButton = ({ onClear }: { onClear: () => void }) => {
  return (
    <CloseButton
      size="sm"
      variant="transparent"
      tabIndex={-1}
      title="Eingabe zurücksetzen"
      onClick={onClear}
    />
  );
};
