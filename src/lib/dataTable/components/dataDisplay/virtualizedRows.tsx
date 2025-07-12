import { memo, useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRowKeys, useSelectedRows } from '../../hooks';
import { Row } from './row';

export interface VirtualizedRowsProps {
  scrollRef: React.RefObject<HTMLElement | null>;
  rowHeight: number;
  overscan?: number;
}

const useVirtual = (options: Parameters<typeof useVirtualizer>[0]) => {
  'use no memo';

  const { getVirtualItems, getTotalSize } = useVirtualizer(options);

  return { virtualItems: getVirtualItems(), totalSize: getTotalSize() };
};

export const VirtualizedRows = memo(
  ({
    scrollRef,
    rowHeight,
    overscan,
    children
  }: React.PropsWithChildren<VirtualizedRowsProps>) => {
    const rowKeys = useRowKeys();
    const selection = useSelectedRows();

    const getItemKey = useCallback(
      (index: number) => rowKeys[index]!,
      [rowKeys]
    );

    const { virtualItems, totalSize } = useVirtual({
      count: rowKeys.length,
      getScrollElement: () => scrollRef.current,
      estimateSize: () => rowHeight,
      getItemKey,
      overscan
    });

    return (
      <div
        role="rowgroup"
        className="data-table-row-group"
        style={{
          height: `${totalSize}px`,
          position: 'relative'
        }}
      >
        {virtualItems.map(({ index, start, size }) => {
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
