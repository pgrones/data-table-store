import type React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { RowKey } from '../../../dataTableStore/dataTableStore.types';
import { typedMemo } from '../../dataTable.types';
import { useRowKeys } from '../../hooks';
import { Row } from './row';

export interface VirtualizedTbodyProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
  scrollRef: React.RefObject<HTMLElement | null>;
  rowHeight: number;
  overscan?: number;
}

export const createVirtualizedTbody = (Tbody: React.ElementType) =>
  typedMemo(
    <TEntity extends object>({
      scrollRef,
      rowHeight,
      overscan,
      children,
      ...props
    }: VirtualizedTbodyProps<TEntity>) => {
      const rowKeys = useRowKeys();

      const virtualizer = useVirtualizer({
        count: rowKeys.length,
        getItemKey: index => rowKeys[index]!,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => rowHeight,
        overscan
      });

      const virtualItems = virtualizer.getVirtualItems();

      const paddingTop = virtualItems[0]?.start ?? 0;
      const paddingBottom =
        virtualizer.getTotalSize() - (virtualItems.at(-1)?.end ?? 0);

      const visibleRowKeys = virtualItems.map(item => rowKeys[item.index]!);

      return (
        <Tbody {...props}>
          <tr style={{ height: paddingTop }} />
          <TableRows rowKeys={visibleRowKeys} renderRow={children} />
          <tr style={{ height: paddingBottom }} />
        </Tbody>
      );
    }
  );

interface TableRowsProps<TEntity extends object> {
  renderRow: (row: TEntity) => React.ReactNode;
  rowKeys: RowKey[];
}

const TableRows = typedMemo(
  <TEntity extends object>({ rowKeys, renderRow }: TableRowsProps<TEntity>) =>
    rowKeys.map(rowKey => (
      <Row key={rowKey} rowKey={rowKey} renderRow={renderRow} />
    ))
);
