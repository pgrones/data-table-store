import { Group, Table, type BoxMod, type TableThProps } from '@mantine/core';
import { IconArrowsSort, IconSortAscending } from '@tabler/icons-react';
import { SortableTh as DataTableSortableTh } from '../../lib/dataTable';
import classes from './sortableTh.module.css';

export const SortableTh = DataTableSortableTh.as<TableThProps>(
  ({
    isSorted,
    descending,
    toggleSort,
    onClick,
    mod,
    className = '',
    children,
    ...props
  }) => {
    const isRightAligned = props.ta === 'right' || props.ta === 'end';

    const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
      toggleSort();
      onClick?.(e);
    };

    const mergedMod: BoxMod[] = [
      ...(Array.isArray(mod) ? mod : [mod]),
      { sorted: isSorted, descending }
    ];

    const mergedClasses = `${classes['sortable-header']} ${className}`;

    return (
      <Table.Th
        {...props}
        mod={mergedMod}
        className={mergedClasses}
        onClick={handleClick}
      >
        <Group
          gap="xs"
          wrap="nowrap"
          justify="space-between"
          style={{ flexDirection: isRightAligned ? 'row-reverse' : 'row' }}
        >
          {children}

          {isSorted ? (
            <IconSortAscending size={20} stroke={1.5} />
          ) : (
            <IconArrowsSort size={20} stroke={1.5} data-default={true} />
          )}
        </Group>
      </Table.Th>
    );
  }
);
