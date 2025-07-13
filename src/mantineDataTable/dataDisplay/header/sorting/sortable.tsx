import React, { cloneElement } from 'react';
import { useSorting } from '@lib';
import { Group } from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
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
  const sorting = useSorting(columnKey);

  const mergedRef = useMergedRef(ref, children.props.ref);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (sorting?.isSortable) sorting.toggleColumnSort();
    children.props.onClick?.(e);
  };

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
    <Group className={classes.sorting}>
      <HeaderLabel>{children.props.children}</HeaderLabel>
      {sorting?.isSortable && (
        <>
          <IconSortAscending data-ascending className={classes.icon} />
          <IconSortDescending data-descending className={classes.icon} />
        </>
      )}
    </Group>
  );
};
