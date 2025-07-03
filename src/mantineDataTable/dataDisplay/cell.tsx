import { Cell as DataTableCell } from '@lib';
import { Box, type BoxProps } from '@mantine/core';

export const Cell = DataTableCell.as<React.PropsWithChildren<BoxProps>>(
  ({ value, children: _, ...props }) => {
    return (
      <Box
        fz="sm"
        {...props}
        style={[
          props.style,
          {
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        ]}
      >
        {value}
      </Box>
    );
  }
);
