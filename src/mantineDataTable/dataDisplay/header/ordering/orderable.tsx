import { cloneElement } from 'react';
import type { HeaderProps } from '../header';
import { useColumnOrdering } from './useColumnOrdering';

interface OrderableHeaderProps {
  columnKey: string;
  children: React.ReactElement<HeaderProps>;
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
    mod: [{ orderable: isOrderable }],
    ...attributes,
    ...listeners
  });
};
