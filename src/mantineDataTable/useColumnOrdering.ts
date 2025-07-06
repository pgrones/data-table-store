import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useOrdering } from '@lib';

export const useColumnOrdering = (columnKey: string) => {
  const { isOrderable } = useOrdering(columnKey);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: columnKey });

  if (!isOrderable)
    return {
      ref: { current: null },
      style: {},
      attributes: {},
      listeners: {}
    };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return {
    ref: setNodeRef,
    style,
    attributes,
    listeners
  };
};
