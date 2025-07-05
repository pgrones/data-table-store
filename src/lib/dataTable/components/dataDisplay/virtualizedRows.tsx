import type React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { RowKey } from '../../../dataTableStore';
import { typedMemo } from '../../dataTable.types';
import { useRowKeys } from '../../hooks';
import { useSelectedRows } from '../../hooks/useSelectedRows';
import { Row } from './row';

export interface VirtualizedRowsProps<TEntity extends object> {
  children: (row: Partial<TEntity>) => React.ReactNode;
  scrollRef: React.RefObject<HTMLElement | null>;
  rowHeight: number;
  overscan?: number;
}

export const createVirtualizedRows = <TEntity extends object>() =>
  typedMemo(
    ({
      scrollRef,
      rowHeight,
      overscan,

      children
    }: VirtualizedRowsProps<TEntity>) => {
      const rowKeys = useRowKeys();

      const virtualizer = useVirtualizer({
        count: rowKeys.length,
        getItemKey: index => rowKeys[index]!,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => rowHeight,
        overscan
      });

      const selection = useSelectedRows();

      return (
        <div
          role="rowgroup"
          className="data-table-row-group"
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            position: 'relative'
          }}
        >
          {virtualizer.getVirtualItems().map(({ key, start, size }) => (
            <div
              key={key}
              role="row"
              className="data-table-row"
              data-selected={selection.includes(key as string)}
              style={{
                transform: `translateY(${start}px)`,
                height: size,
                position: 'absolute',
                top: 0,
                left: 0
              }}
            >
              <Row rowKey={key as RowKey} renderRow={children} />
            </div>
          ))}
        </div>
      );
    }
  );
