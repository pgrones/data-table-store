import { RowSelector as DataTableRowSelector, useRowSelection } from '@lib';
import { Checkbox, type CheckboxProps } from '@mantine/core';

export const RowSelector = DataTableRowSelector.as<
  Omit<CheckboxProps, 'checked'>
>(({ rowKey, onChange, ...props }) => {
  const { isSelected, toggleRowSelection } = useRowSelection(rowKey);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleRowSelection();
    onChange?.(e);
  };

  return <Checkbox {...props} checked={isSelected} onChange={handleChange} />;
});
