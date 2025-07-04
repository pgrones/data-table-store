import { Header as DataTableHeader, useSorting } from '@lib';
import {
  Group,
  UnstyledButton,
  type ElementProps,
  type UnstyledButtonProps
} from '@mantine/core';
import { IconArrowsSort, IconSortAscending } from '@tabler/icons-react';
import { HeaderResize } from './header.resize';
import classes from './header.module.css';

export interface HeaderProps
  extends UnstyledButtonProps,
    ElementProps<'button', keyof UnstyledButtonProps> {
  ref?: React.Ref<HTMLButtonElement>;
}

export const HeaderLabel = ({ children }: { children: string }) => (
  <span data-header-label className={classes.label}>
    {children}
  </span>
);

export const Header = DataTableHeader.as<HeaderProps>(
  ({ onClick, className = '', mod, children, columnKey, ...props }) => {
    const sorting = useSorting(columnKey);

    const isRightAligned = props.ta === 'right' || props.ta === 'end';

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (sorting?.isSortable) sorting.toggleColumnSort();
      onClick?.(e);
    };

    return (
      <UnstyledButton
        {...props}
        className={`${classes.header} ${className}`}
        onClick={handleClick}
        mod={[
          mod,
          {
            sortable: sorting?.isSortable,
            sorted: sorting?.isSorted,
            descending: sorting?.descending
          }
        ]}
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

        <HeaderResize columnKey={columnKey} />
      </UnstyledButton>
    );
  }
);
