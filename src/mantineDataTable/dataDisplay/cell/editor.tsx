import { Checkbox, NumberInput, Select, TextInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import {
  sharedProps,
  type DataType,
  type EditorPropsMap
} from './editor.extensions';

export type EditorProps = {
  [K in DataType]: { type: K; props: EditorPropsMap[K] };
}[DataType];

export const Editor = ({ type, props }: EditorProps) => {
  switch (type) {
    case 'number':
      return (
        <NumberInput
          {...{ ...sharedProps, ...props }}
          onChange={e => props.onChange(e || 0)}
        />
      );
    case 'date':
      return (
        <DateInput
          {...{ ...sharedProps, ...props }}
          onChange={e => props.onChange(e === null ? e : new Date(e))}
        />
      );
    case 'boolean':
      return (
        <Checkbox
          {...{ ...props }}
          checked={props.value}
          onChange={e => props.onChange(e.currentTarget.checked)}
        />
      );
    case 'select':
      return <Select {...{ ...sharedProps, ...props }} />;
    case 'custom':
      throw new Error('not implemented');
    default:
      return (
        <TextInput
          {...{ ...sharedProps, ...props }}
          onChange={e => props.onChange(e.currentTarget.value)}
        />
      );
  }
};
