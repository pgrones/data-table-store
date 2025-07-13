import { cloneElement } from 'react';
import type { ElementProps, GroupProps } from '@mantine/core';
import { useColumnOrdering } from './useColumnOrdering';

export interface WrapperProps
  extends GroupProps,
    ElementProps<'div', keyof GroupProps> {
  ref?: React.Ref<HTMLDivElement>;
}

interface OrderableHeaderProps {
  columnKey: string;
  children: React.ReactElement<WrapperProps>;
}

export const Orderable = ({
  columnKey,
  children
}: React.PropsWithChildren<OrderableHeaderProps>) => {
  const { ref, style, attributes, listeners, isOrderable } =
    useColumnOrdering(columnKey);

  return cloneElement(children, {
    ...children.props,
    ref,
    style,
    mod: [children.props.mod, { orderable: isOrderable }],
    ...attributes,
    ...listeners
  });
};
