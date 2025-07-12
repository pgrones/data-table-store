import { Header as DataTableHeader } from '@lib';
import type { ElementProps, UnstyledButtonProps } from '@mantine/core';
import { HeaderCell } from './headerCell';
import { Orderable } from './ordering/orderable';
import { Resizable } from './resizing/resizable';
import { Sortable } from './sorting/sortable';

export interface HeaderProps
  extends UnstyledButtonProps,
    ElementProps<'button', keyof UnstyledButtonProps> {
  ref?: React.Ref<HTMLButtonElement>;
}

export const Header = DataTableHeader.as<HeaderProps>(
  ({ columnKey, children, ...props }) => {
    return (
      <Orderable columnKey={columnKey}>
        <Sortable columnKey={columnKey}>
          <HeaderCell {...props} id={columnKey}>
            <Resizable columnKey={columnKey}>{children}</Resizable>
          </HeaderCell>
        </Sortable>
      </Orderable>
    );
  }
);
