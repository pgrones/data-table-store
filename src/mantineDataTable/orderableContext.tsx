import { memo } from 'react';
import { closestCenter, DndContext, type DragEndEvent } from '@dnd-kit/core';
import {
  horizontalListSortingStrategy,
  SortableContext
} from '@dnd-kit/sortable';
import { useColumnKeys, useReorder } from '@lib';

export const OrderableContext = ({ children }: React.PropsWithChildren) => {
  const columnKeys = useColumnKeys();
  const reorderColumn = useReorder();

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (over === null || active.id === over.id) return;

    const newPosition = columnKeys.indexOf(over.id as string);
    reorderColumn(active.id as string, newPosition);
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <SortableContext
        items={columnKeys}
        strategy={horizontalListSortingStrategy}
      >
        <MemoizedChildren>{children}</MemoizedChildren>
      </SortableContext>
    </DndContext>
  );
};

const MemoizedChildren = memo(
  ({ children }: React.PropsWithChildren) => <>{children}</>,
  () => true
);
