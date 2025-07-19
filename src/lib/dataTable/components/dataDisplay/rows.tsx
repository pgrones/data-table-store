import { memo } from 'react';
import { useRowKeys } from '../../hooks';
import { Row } from './row';

export const Rows = memo(({ children }: React.PropsWithChildren) => {
  const rowKeys = useRowKeys();

  return (
    <div role="rowgroup" className="data-table-row-group">
      {rowKeys.map(rowKey => (
        <Row key={rowKey} rowKey={rowKey} style={{ position: 'relative' }}>
          {children}
        </Row>
      ))}
    </div>
  );
});
