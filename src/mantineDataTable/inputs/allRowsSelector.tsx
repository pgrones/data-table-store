import { Checkbox, type CheckboxProps } from '@mantine/core';
import { AllRowsSelector as DataTableAllRowsSelector } from '../../lib/dataTable';

export const AllRowsSelector = DataTableAllRowsSelector.as<
  Omit<CheckboxProps, 'checked' | 'indeterminate'>
>(({ isSelected, toggleSelection, indeterminate, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleSelection();
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
