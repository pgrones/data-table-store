import { useDeferredValue } from 'react';
import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { typedMemo } from '../../dataTable.types';
import { useDataTableRowKeys } from '../../hooks';
import { Row } from './row';

export interface TbodyProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
}

export const createTbody = (Tbody: React.ElementType) =>
  typedMemo(
    <TEntity extends object>({ children, ...props }: TbodyProps<TEntity>) => {
      const rowKeys = useDataTableRowKeys();

      const deferredRowKeys = useDeferredValue(rowKeys);

      return (
        <Tbody {...props}>
          <TableRows rowKeys={deferredRowKeys} renderRow={children} />
        </Tbody>
      );
    }
  );

interface TableRowsProps<TEntity extends object> {
  rowKeys: RowKey[];
  renderRow: (row: TEntity) => React.ReactNode;
}

const TableRows = typedMemo(
  <TEntity extends object>({ rowKeys, renderRow }: TableRowsProps<TEntity>) =>
    rowKeys.map(rowKey => (
      <Row key={rowKey} rowKey={rowKey} renderRow={renderRow} />
    ))
);
