import {
  AllRowsSelector as DataTableAllRowsSelector,
  useAllRowsSelection
} from '@lib';
import { Checkbox, type CheckboxProps } from '@mantine/core';

export const AllRowsSelector = DataTableAllRowsSelector.as<
  Omit<CheckboxProps, 'checked' | 'indeterminate'>
>(({ onChange, ...props }) => {
  const { isSelected, indeterminate, toggleAllRowSelections } =
    useAllRowsSelection();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleAllRowSelections();
    onChange?.(e);
  };

  return (
    <Checkbox
      {...props}
      checked={isSelected}
      indeterminate={indeterminate}
      onChange={handleChange}
    />
  );
});
