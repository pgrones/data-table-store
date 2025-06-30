import { useDeferredValue } from 'react';
import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { typedMemo } from '../../dataTable.types';
import { useRowKeys } from '../../hooks';
import { useDataTableOptions } from '../dataTable.context';
import { Row } from './row';

export interface RowsProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
}

export const Rows = typedMemo(
  <TEntity extends object>({ children }: RowsProps<TEntity>) => {
    const rowKeys = useRowKeys();
    const deferredRowKeys = useDeferredValue(rowKeys);

    return (
      <div role="rowgroup">
        <TableRows rowKeys={deferredRowKeys} renderRow={children} />
      </div>
    );
  }
);

interface TableRowsProps<TEntity extends object> {
  rowKeys: RowKey[];
  renderRow: (row: TEntity) => React.ReactNode;
}

const TableRows = typedMemo(
  <TEntity extends object>({ rowKeys, renderRow }: TableRowsProps<TEntity>) => {
    const { horizontalSpacing, verticalSpacing } = useDataTableOptions();

    return rowKeys.map(rowKey => (
      <div
        key={rowKey}
        role="row"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          columnGap: horizontalSpacing,
          paddingBlock: verticalSpacing
        }}
      >
        <Row rowKey={rowKey} renderRow={renderRow} />
      </div>
    ));
  }
);
