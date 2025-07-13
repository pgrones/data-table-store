import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useOrdering } from '@lib';

export const useColumnOrdering = (columnKey: string) => {
  const { isOrderable } = useOrdering(columnKey);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: columnKey });

  if (!isOrderable)
    return {
      ref: { current: null },
      style: {},
      attributes: {},
      listeners: {},
      isOrderable
    };

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    filter: isDragging ? 'brightness(0.8)' : undefined
  };

  return {
    ref: setNodeRef,
    style,
    attributes,
    listeners,
    isOrderable
  };
};
