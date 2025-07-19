/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState } from 'react';
import { useEditing, type RowKey } from '@lib';
import type { NumberInputProps, TextInputProps } from '@mantine/core';
import type { DateInputProps } from '@mantine/dates';
import {
  useClickOutside,
  useFocusReturn,
  useFocusTrap,
  useMergedRef
} from '@mantine/hooks';

export const supportedDataTypes = [
  'custom',
  'string',
  'number',
  'date'
] as const;

export type DataType = (typeof supportedDataTypes)[number];

export interface EditorPropsMap {
  custom: {
    ref?: React.Ref<HTMLInputElement>;
    onChange: (value: unknown) => void;
  };
  string: TextInputProps & {
    ref?: React.Ref<HTMLInputElement>;
    onChange: (value: string) => void;
  };
  number: NumberInputProps & {
    ref?: React.Ref<HTMLInputElement>;
    onChange: (value: number) => void;
  };
  date: DateInputProps & {
    ref?: React.Ref<HTMLInputElement>;
    onChange: (value: Date | null) => void;
  };
}

export const sharedProps = {
  w: '100%',
  styles: {
    wrapper: {
      marginInline: 'calc(var(--data-table-horizontal-spacing) * -1)'
    },
    input: {
      paddingInline: 'calc(var(--data-table-horizontal-spacing) - 1px)'
    }
  }
};

export const useEditor = (
  columnKey: string,
  rowKey: RowKey,
  type: 'infer' | DataType,
  cellValue: unknown
) => {
  const {
    isEditable,
    isEditing,
    isEdited,
    startEditing,
    stopEditing,
    updateValue,
    inferredType
  } = useEditing(columnKey, rowKey);

  const [value, onChange] = useState<any>(cellValue);

  const returnFocus = useFocusReturn({
    opened: isEditing,
    shouldReturnFocus: false
  });
  const focusTrapRef = useFocusTrap(isEditing);

  const update = () => {
    if (!isEditable) return;

    updateValue(value);
    stopEditing();
    returnFocus();
  };

  const clickOutsideRef = useClickOutside(update);

  const ref = useMergedRef<HTMLInputElement>(focusTrapRef, clickOutsideRef);

  if (!isEditable) return { isEditing: false, startEditing, onChange };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === 'Tab') {
      e.stopPropagation();
      update();
    }

    if (e.key === 'Escape') {
      e.stopPropagation();
      onChange(cellValue);
      stopEditing();
      returnFocus();
    }
  };

  return {
    isEditing,
    isEdited,
    startEditing,
    type: (type === 'infer' ? inferredType : type) as DataType,
    onKeyDown,
    onChange,
    value,
    ref
  };
};
