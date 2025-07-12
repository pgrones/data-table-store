import React, { cloneElement, useRef } from 'react';
import { useSorting } from '@lib';
import { Group } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { IconArrowsSort, IconSortAscending } from '@tabler/icons-react';
import { type HeaderProps } from '../header';
import { HeaderLabel } from '../headerCell';
import classes from '../header.module.css';

interface SortableProps extends Omit<HeaderProps, 'children'> {
  columnKey: string;
  children: React.ReactElement<HeaderProps>;
}

export const Sortable = ({
  columnKey,
  children,
  mod,
  ref,
  ...props
}: SortableProps) => {
  const alignRef = useRef<HTMLElement>(null);
  const sorting = useSorting(columnKey);

  const mergedRef = useMergedRef(ref, children.props.ref, alignRef);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sorting?.isSortable) sorting.toggleColumnSort();
    children.props.onClick?.(e);
  };

  const rightAligned = alignRef.current
    ? ['end', 'right'].includes(getComputedStyle(alignRef.current).textAlign)
    : false;

  return cloneElement(
    children,
    {
      ...children.props,
      ...props,
      ref: mergedRef,
      onClick: handleClick,
      mod: [
        children.props.mod,
        mod,
        {
          sortable: sorting?.isSortable,
          sorted: sorting?.isSorted,
          descending: sorting?.descending
        }
      ]
    },
    <Group className={classes.wrapper} mod={{ end: rightAligned }}>
      <HeaderLabel>{children.props.children}</HeaderLabel>
      <IconSortAscending className={classes.icon} />
      <IconArrowsSort data-default className={classes.icon} />
    </Group>
  );
};
