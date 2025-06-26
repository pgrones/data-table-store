import { Checkbox, type CheckboxProps } from '@mantine/core';
import { RowSelector as DataTableRowSelector } from '../../lib/dataTable';

export const RowSelector = DataTableRowSelector.as<
  Omit<CheckboxProps, 'checked'>
>(({ isSelected, toggleSelection, onChange, ...props }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleSelection();
    onChange?.(e);
  };

  return <Checkbox {...props} checked={isSelected} onChange={handleChange} />;
});
