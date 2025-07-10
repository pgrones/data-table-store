import { cloneElement, isValidElement } from 'react';
import { useMergedRef } from '@mantine/hooks';
import { hasChildren } from '../hasChildren';
import type { HeaderProps } from '../header';
import { HeaderLabel } from '../headerCell';
import { useColumnOrdering } from './useColumnOrdering';

interface OrderableHeaderProps extends Omit<HeaderProps, 'children'> {
  columnKey: string;
  children: React.ReactElement<HeaderProps> | React.ReactNode;
}

export const Orderable = ({
  columnKey,
  ref,
  children,
  mod,
  ...props
}: OrderableHeaderProps) => {
  const {
    ref: orderRef,
    style,
    attributes,
    listeners,
    isOrderable
  } = useColumnOrdering(columnKey);

  const mergedRef = useMergedRef(ref, orderRef);

  if (!isValidElement(children) || !hasChildren(children.props))
    return <HeaderLabel>{children}</HeaderLabel>;

  return cloneElement(children as React.ReactElement<HeaderProps>, {
    ...children.props,
    ...props,
    ref: mergedRef,
    style: [props.style, style],
    mod: [mod, { orderable: isOrderable }],
    ...attributes,
    ...listeners
  });
};
