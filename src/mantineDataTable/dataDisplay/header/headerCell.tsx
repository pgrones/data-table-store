import { UnstyledButton } from '@mantine/core';
import type { HeaderProps } from './header';
import classes from './header.module.css';

export const HeaderLabel = ({ children }: React.PropsWithChildren) =>
  typeof children === 'string' ? (
    <span data-header-label title={children} className={classes.label}>
      {children}
    </span>
  ) : (
    children
  );

export const HeaderCell = ({
  children,
  className = '',
  ...props
}: HeaderProps) => {
  return (
    <UnstyledButton {...props} className={`${classes.header} ${className}`}>
      {children}
    </UnstyledButton>
  );
};
