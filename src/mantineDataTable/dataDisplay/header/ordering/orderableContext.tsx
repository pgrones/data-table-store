import { memo, useState } from 'react';
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type Active,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import {
  restrictToFirstScrollableAncestor,
  restrictToHorizontalAxis
} from '@dnd-kit/modifiers';
import {
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { useOrderedColumnKeys, useReorder, useTableKey } from '@lib';
import { createPortal } from 'react-dom';
import { HeaderCell, HeaderLabel } from '../headerCell';
import { useHeaders } from './useHeaders';

export const OrderableContext = ({ children }: React.PropsWithChildren) => {
  const tableKey = useTableKey();
  const columnKeys = useOrderedColumnKeys();
  const reorderColumn = useReorder();
  const headers = useHeaders(children);
  const [active, setActive] = useState<Active | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => setActive(active);

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over === null || active.id === over.id) return;

    const newPosition = columnKeys.indexOf(over.id as string);
    reorderColumn(active.id as string, newPosition);

    setActive(null);
  };

  const [header, props] = active
    ? (headers.current.get(active.id as string) ?? [])
    : [];
  const container = document.getElementById(tableKey);

  // TODO: prevent vertical scrolling during drag
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActive(null)}
      collisionDetection={closestCenter}
      modifiers={[restrictToHorizontalAxis, restrictToFirstScrollableAncestor]}
      sensors={sensors}
    >
      <SortableContext
        items={columnKeys}
        strategy={horizontalListSortingStrategy}
      >
        <MemoizedChildren>{children}</MemoizedChildren>
      </SortableContext>

      {container &&
        createPortal(
          <DragOverlay className="data-table-header">
            {active && (
              <HeaderCell {...props} mod={{ dragging: true }}>
                <HeaderLabel>{header}</HeaderLabel>
              </HeaderCell>
            )}
          </DragOverlay>,
          container
        )}
    </DndContext>
  );
};

const MemoizedChildren = memo(({ children }: React.PropsWithChildren) => (
  <>{children}</>
));
