import { Cell as DataTableCell } from '@lib';
import { Box, type BoxProps } from '@mantine/core';

export const Cell = DataTableCell.as<BoxProps>(({ cellValue, ...props }) => {
  return (
    <Box
      fz="sm"
      display="flex"
      h="100%"
      {...props}
      style={[
        props.style,
        {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          alignItems: 'center'
        }
      ]}
    >
      {cellValue}
    </Box>
  );
});
