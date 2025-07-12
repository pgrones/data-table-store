import { memo } from 'react';
import { useRowKeys } from '../../hooks';
import { useSelectedRows } from '../../hooks/useSelectedRows';
import { Row } from './row';

export const Rows = memo(({ children }: React.PropsWithChildren) => {
  const rowKeys = useRowKeys();
  const selection = useSelectedRows();

  return (
    <div role="rowgroup" className="data-table-row-group">
      {rowKeys.map(rowKey => (
        <div
          key={rowKey}
          role="row"
          className="data-table-row"
          data-selected={selection.includes(rowKey)}
        >
          <Row rowKey={rowKey}>{children}</Row>
        </div>
      ))}
    </div>
  );
});
