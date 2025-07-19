import { useResize, useSorting } from '@lib';
import { ActionIcon, Menu } from '@mantine/core';
import {
  IconArrowsMoveHorizontal,
  IconArrowsSort,
  IconDotsVertical,
  IconSortAscending,
  IconSortDescending
} from '@tabler/icons-react';
import { useAutoResize } from '../resizing/useAutoResize';
import classes from '../header.module.css';

interface HeaderMenuProps {
  columnKey: string;
  reverse: boolean;
}

export const HeaderMenu = ({ columnKey, reverse }: HeaderMenuProps) => {
  const resize = useResize(columnKey);
  const sorting = useSorting(columnKey);
  const autoResize = useAutoResize(columnKey);

  if (!resize?.isResizable && !sorting?.isSortable) return null;

  const Sorting = () =>
    sorting?.isSortable ? (
      <>
        {(!sorting.isSorted || sorting.descending) && (
          <Menu.Item
            leftSection={<IconSortAscending className={classes.icon} />}
            onClick={() => sorting.sortColumn()}
          >
            Sort Ascending
          </Menu.Item>
        )}

        {!sorting.descending && (
          <Menu.Item
            leftSection={<IconSortDescending className={classes.icon} />}
            onClick={() => sorting.sortColumn(true)}
          >
            Sort Descending
          </Menu.Item>
        )}

        {sorting.isSorted && (
          <Menu.Item
            leftSection={<IconArrowsSort className={classes.icon} />}
            onClick={sorting.resetColumnSort}
          >
            Clear Sorting
          </Menu.Item>
        )}

        <Menu.Divider />
      </>
    ) : null;

  return (
    <Menu
      position={reverse ? 'top-start' : 'top-end'}
      offset={{ crossAxis: reverse ? 8 : -8, mainAxis: 8 }}
      withArrow
      arrowOffset={0}
      styles={{
        itemSection: { color: 'var(--mantine-primary-color-light-color)' }
      }}
    >
      <Menu.Target>
        <ActionIcon
          size="sm"
          variant="subtle"
          color="var(--mantine-color-text)"
        >
          <IconDotsVertical className={classes.icon} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Column Options</Menu.Label>

        <Sorting />

        <Menu.Item
          leftSection={<IconArrowsMoveHorizontal className={classes.icon} />}
          onClick={autoResize}
        >
          Autosize Column
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
