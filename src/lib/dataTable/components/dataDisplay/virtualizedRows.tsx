import { memo, useLayoutEffect } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRowKeys, useSelectedRows } from '../../hooks';
import { Row } from './row';

export interface VirtualizedRowsProps {
  scrollRef: React.RefObject<HTMLElement | null>;
  rowHeight: number;
  overscan?: number;
}

export const VirtualizedRows = memo(
  ({
    scrollRef,
    rowHeight,
    overscan,
    children
  }: React.PropsWithChildren<VirtualizedRowsProps>) => {
    const rowKeys = useRowKeys();
    const selection = useSelectedRows();

    const virtualizer = useVirtualizer({
      count: rowKeys.length,
      getScrollElement: () => scrollRef.current,
      estimateSize: () => rowHeight,
      overscan
    });

    // For some reason we have to measure again because the virtualizer doesn't seem to notice that the ref updated
    // This worked before, but broke somewhere along the way, hence this hack
    useLayoutEffect(() => {
      virtualizer.measure();
    }, [virtualizer]);

    return (
      <div
        role="rowgroup"
        className="data-table-row-group"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map(({ index, start, size }) => {
          const rowKey = rowKeys[index];

          if (!rowKey) return null;

          return (
            <div
              key={rowKey}
              role="row"
              className="data-table-row"
              data-selected={selection.includes(rowKey)}
              style={{
                transform: `translateY(${start}px)`,
                height: size,
                position: 'absolute',
                top: 0,
                left: 0
              }}
            >
              <Row rowKey={rowKey}>{children}</Row>
            </div>
          );
        })}
      </div>
    );
  }
);
