import { Header as DataTableHeader, useSorting } from '@lib';
import {
  Group,
  UnstyledButton,
  type ElementProps,
  type UnstyledButtonProps
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { IconArrowsSort, IconSortAscending } from '@tabler/icons-react';
import { HeaderCell } from './headerCell';
import { Orderable } from './ordering/orderable';
import { useColumnOrdering } from './ordering/useColumnOrdering';
import { Resizable } from './resizing/resizable';
import { ResizeHandle } from './resizing/resizeHandle';
import { Sortable } from './sorting/sortable';
import classes from './header.module.css';

export interface HeaderProps
  extends UnstyledButtonProps,
    ElementProps<'button', keyof UnstyledButtonProps> {
  ref?: React.Ref<HTMLButtonElement>;
}

export const Header = DataTableHeader.as<HeaderProps>(
  ({ columnKey, children, ...props }) => {
    return (
      <Orderable columnKey={columnKey}>
        <HeaderCell {...props} id={columnKey}>
          <Sortable columnKey={columnKey}>
            <Resizable columnKey={columnKey}>{children}</Resizable>
          </Sortable>
        </HeaderCell>
      </Orderable>
    );
  }
);

export const HeaderLabel = ({ children }: { children: string }) => (
  <span data-header-label className={classes.label}>
    {children}
  </span>
);

export const Headerx = DataTableHeader.as<HeaderProps>(
  ({ onClick, className = '', mod, children, columnKey, ref, ...props }) => {
    const sorting = useSorting(columnKey);

    const {
      ref: orderRef,
      style,
      attributes,
      listeners
    } = useColumnOrdering(columnKey);

    const mergedRef = useMergedRef(ref, orderRef);

    const isRightAligned = props.ta === 'right' || props.ta === 'end';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (sorting?.isSortable) sorting.toggleColumnSort();
      onClick?.(e);
    };

    return (
      <UnstyledButton
        {...props}
        ref={mergedRef}
        className={`${classes.header} ${className}`}
        onClick={handleClick}
        style={[props.style, style]}
        mod={[
          mod,
          {
            sortable: sorting?.isSortable,
            sorted: sorting?.isSorted,
            descending: sorting?.descending
          }
        ]}
        {...attributes}
        {...listeners}
      >
        <Group className={classes.wrapper} mod={{ end: isRightAligned }}>
          {typeof children === 'string' ? (
            <HeaderLabel>{children}</HeaderLabel>
          ) : (
            children
          )}

          <IconSortAscending className={classes.icon} />
          <IconArrowsSort data-default className={classes.icon} />
        </Group>

        <ResizeHandle columnKey={columnKey} />
      </UnstyledButton>
    );
  }
);
