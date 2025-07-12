import { memo } from 'react';
import type { RowKey } from '../../../dataTableStore';
import { RowContext } from './row.context';

interface RowProps {
  rowKey: RowKey;
}

export const Row = memo(
  ({ rowKey, children }: React.PropsWithChildren<RowProps>) => {
    return <RowContext value={{ rowKey }}>{children}</RowContext>;
  }
);
