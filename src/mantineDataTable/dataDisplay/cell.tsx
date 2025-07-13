import { Cell as DataTableCell } from '@lib';
import { Flex, type BoxProps } from '@mantine/core';

export const Cell = DataTableCell.as<BoxProps>(({ cellValue, ...props }) => {
  return (
    <Flex fz="sm" h="100%" align="center" {...props}>
      {typeof cellValue === 'string' ? (
        <span
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {cellValue}
        </span>
      ) : (
        cellValue
      )}
    </Flex>
  );
});
