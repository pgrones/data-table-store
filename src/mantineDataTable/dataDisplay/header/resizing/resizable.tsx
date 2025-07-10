import { cloneElement, isValidElement } from 'react';
import { hasChildren } from '../hasChildren';
import type { HeaderProps } from '../header';
import { HeaderLabel } from '../headerCell';
import { ResizeHandle } from './resizeHandle';

export interface ResizableProps extends Omit<HeaderProps, 'children'> {
  columnKey: string;
  children: React.ReactElement<HeaderProps> | React.ReactNode;
}

export const Resizable = ({
  columnKey,
  children,
  ...props
}: ResizableProps) => {
  if (!isValidElement(children) || !hasChildren(children.props))
    return <HeaderLabel>{children}</HeaderLabel>;

  return cloneElement(
    children,
    { ...children.props, ...props },
    <HeaderLabel>{children.props.children}</HeaderLabel>,
    <ResizeHandle columnKey={columnKey} />
  );
};
