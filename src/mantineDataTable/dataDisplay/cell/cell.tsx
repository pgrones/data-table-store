import { Cell as DataTableCell, useCell } from '@lib';
import { Flex, Text, type ElementProps, type FlexProps } from '@mantine/core';
import { Editor } from './editor';
import { useEditor, type DataType } from './editor.extensions';
import classes from './cell.module.css';

export interface CellProps extends FlexProps, ElementProps<'div'> {
  type?: 'infer' | DataType;
  ref?: React.Ref<HTMLDivElement>;
}

export const Cell = DataTableCell.as<CellProps>(
  ({ type = 'infer', className = '', onDoubleClick, onKeyDown, ...props }) => {
    const { value, cellValue, columnKey, rowKey } = useCell();
    const {
      isEditing,
      isEdited,
      startEditing,
      type: editorType,
      ...editorProps
    } = useEditor(columnKey, rowKey, type, cellValue);

    const handleDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      startEditing();
      onDoubleClick?.(e);
    };

    const handleKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') startEditing();
      onKeyDown?.(e);
    };

    return (
      <Flex
        {...props}
        mod={[props.mod, { edited: isEdited }]}
        className={`${className} ${classes.cell}`}
        onKeyDown={handleKeydown}
        onDoubleClick={handleDoubleClick}
        tabIndex={0}
      >
        {isEditing ? (
          <Editor type={editorType!} props={editorProps} />
        ) : typeof value === 'string' || typeof value === 'number' ? (
          <Text inherit truncate>
            {value}
          </Text>
        ) : (
          value
        )}
      </Flex>
    );
  }
);
