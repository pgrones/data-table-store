import type React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import type { RowKey } from '../../../dataTableStore';
import { typedMemo } from '../../dataTable.types';
import { useRowKeys } from '../../hooks';
import { useDataTableOptions } from '../dataTable.context';
import { Row } from './row';

export interface VirtualizedRowsProps<TEntity extends object> {
  children: (row: TEntity) => React.ReactNode;
  scrollRef: React.RefObject<HTMLElement | null>;
  rowHeight: number;
  overscan?: number;
}

export const VirtualizedRows = typedMemo(
  <TEntity extends object>({
    scrollRef,
    rowHeight,
    overscan,

    children
  }: VirtualizedRowsProps<TEntity>) => {
    const rowKeys = useRowKeys();
    const { horizontalSpacing, verticalSpacing } = useDataTableOptions();

    const virtualizer = useVirtualizer({
      count: rowKeys.length,
      getItemKey: index => rowKeys[index]!,
      getScrollElement: () => scrollRef.current,
      estimateSize: () => rowHeight,
      overscan
    });

    return (
      <div
        role="rowgroup"
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative'
        }}
      >
        {virtualizer.getVirtualItems().map(({ key, start, size }) => (
          <div
            key={key}
            role="row"
            style={{
              transform: `translateY(${start}px)`,
              height: size,
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              display: 'grid',
              gridAutoFlow: 'column',
              columnGap: horizontalSpacing,
              paddingBlock: verticalSpacing
            }}
          >
            <Row rowKey={key as RowKey} renderRow={children} />
          </div>
        ))}
      </div>
    );
  }
);
