import React, { cloneElement, isValidElement } from 'react';
import { useSorting } from '@lib';
import { Group } from '@mantine/core';
import { IconArrowsSort, IconSortAscending } from '@tabler/icons-react';
import { hasChildren } from '../hasChildren';
import { type HeaderProps } from '../header';
import { HeaderLabel } from '../headerCell';
import classes from '../header.module.css';

interface SortableProps extends Omit<HeaderProps, 'children'> {
  columnKey: string;
  children: React.ReactElement<HeaderProps> | React.ReactNode;
}

export const Sortable = ({
  columnKey,
  children,
  onClick,
  mod,
  ...props
}: SortableProps) => {
  const sorting = useSorting(columnKey);

  if (!isValidElement(children) || !hasChildren(children.props))
    return <HeaderLabel>{children}</HeaderLabel>;

  const isRightAligned = props.ta === 'right' || props.ta === 'end';

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sorting?.isSortable) sorting.toggleColumnSort();
    onClick?.(e);
  };

  return cloneElement(
    children as React.ReactElement<HeaderProps>,
    {
      ...children.props,
      ...props,
      onClick: handleClick,
      mod: [
        mod,
        {
          sortable: sorting?.isSortable,
          sorted: sorting?.isSorted,
          descending: sorting?.descending
        }
      ]
    },
    <Group className={classes.wrapper} mod={{ end: isRightAligned }}>
      <HeaderLabel>{children.props.children}</HeaderLabel>
      <IconSortAscending className={classes.icon} />
      <IconArrowsSort data-default className={classes.icon} />
    </Group>
  );
};
