import { memo } from 'react';
import type { RowKey } from '../../../dataTableStore';
import { useRowSelection } from '../../hooks';
import { useRowState } from '../../hooks/useRowState';
import { RowContext } from './row.context';

interface RowProps extends React.ComponentPropsWithRef<'div'> {
  rowKey: RowKey;
}

export const Row = memo(
  ({ rowKey, children, ...props }: React.PropsWithChildren<RowProps>) => {
    const { isSelected } = useRowSelection(rowKey);
    const state = useRowState(rowKey);

    const rowState = state && { [`data-${state}`]: true };

    return (
      <div
        role="row"
        className="data-table-row"
        data-selected={isSelected}
        {...rowState}
        {...props}
      >
        <Cells rowKey={rowKey}>{children}</Cells>
      </div>
    );
  }
);

interface CellsProps {
  rowKey: RowKey;
}

const Cells = memo(
  ({ rowKey, children }: React.PropsWithChildren<CellsProps>) => {
    return <RowContext value={{ rowKey }}>{children}</RowContext>;
  }
);
