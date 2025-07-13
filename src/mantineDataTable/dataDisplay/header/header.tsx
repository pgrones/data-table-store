import { useRef } from 'react';
import { Header as DataTableHeader } from '@lib';
import {
  Group,
  type ElementProps,
  type UnstyledButtonProps
} from '@mantine/core';
import { useMergedRef } from '@mantine/hooks';
import { HeaderCell } from './headerCell';
import { HeaderMenu } from './headerMenu/headerMenu';
import { Orderable } from './ordering/orderable';
import { ResizeHandle } from './resizing/resizeHandle';
import { Sortable } from './sorting/sortable';
import classes from './header.module.css';

export interface HeaderProps
  extends UnstyledButtonProps,
    ElementProps<'button', keyof UnstyledButtonProps> {
  ref?: React.Ref<HTMLButtonElement>;
}

export const Header = DataTableHeader.as<HeaderProps>(
  ({ columnKey, children, ref, ...props }) => {
    const alignRef = useRef<HTMLElement>(null);

    const mergedRef = useMergedRef(ref, alignRef);

    const reverse = alignRef.current
      ? ['end', 'right'].includes(getComputedStyle(alignRef.current).textAlign)
      : false;

    return (
      <Orderable columnKey={columnKey}>
        <Group className={classes.wrapper} mod={{ reverse }} id={columnKey}>
          <Sortable columnKey={columnKey}>
            <HeaderCell {...props} ref={mergedRef}>
              {children}
            </HeaderCell>
          </Sortable>

          <HeaderMenu columnKey={columnKey} />
          <ResizeHandle columnKey={columnKey} />
        </Group>
      </Orderable>
    );
  }
);
