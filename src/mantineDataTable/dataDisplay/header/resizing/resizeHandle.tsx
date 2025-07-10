import { useLayoutEffect, useRef } from 'react';
import { useResize, useTableKey } from '@lib';
import classes from '../header.module.css';

interface ResizeHandleProps {
  columnKey: string;
}

export const ResizeHandle = ({ columnKey }: ResizeHandleProps) => {
  const tableKey = useTableKey();
  const ref = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(null);
  const resize = useResize(columnKey);

  useLayoutEffect(() => cleanupRef.current?.(), []);

  if (!resize?.isResizable) return null;

  const handleDrag = ({ clientX: initialX }: React.MouseEvent) => {
    cleanupRef.current?.();

    if (!ref.current) return;

    const column = document
      .getElementById(tableKey)
      ?.querySelector(`#${columnKey}`);

    if (!column) return;

    let isDragging = false;
    const rect = column.getBoundingClientRect();
    const minDistanceToLeftEdge = Math.min(100, rect.width);

    const blocker = document.createElement('div');
    blocker.className = classes.blocker!;

    const handleMove = ({ x }: MouseEvent) => {
      if (!ref.current) return;

      if (!isDragging && initialX !== x) {
        isDragging = true;
        document.body.appendChild(blocker);
      }

      if (!isDragging) return;

      const left = x - rect.left;

      if (left < minDistanceToLeftEdge) return;

      ref.current.style.transform = `translateX(${left - rect.width}px)`;
    };

    window.addEventListener('mousemove', handleMove);

    const cleanup = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseup);
      if (isDragging) document.body.removeChild(blocker);
      if (ref.current) ref.current.style.transform = '';
    };

    cleanupRef.current = cleanup;

    const handleMouseup = ({ x }: MouseEvent) => {
      cleanup();
      cleanupRef.current = null;

      if (!ref.current || !isDragging) return;

      const newWidth = Math.max(
        minDistanceToLeftEdge,
        rect.width - (rect.right - x)
      );

      resize.resizeColumn(newWidth);
    };

    window.addEventListener('mouseup', handleMouseup);
  };

  const handleDoubleClick = () => {
    if (!resize.maxWidth || !ref.current) return;

    const label = ref.current.parentElement?.querySelector(
      '[data-header-label]'
    );

    if (!label) {
      resize.resizeColumn(Math.max(resize.maxWidth, 100));
      return;
    }

    const wrapper = label.parentElement!;
    const gap = parseFloat(getComputedStyle(wrapper).gap || '0');

    const header = wrapper.parentElement!;
    const padding = parseFloat(getComputedStyle(header).padding || '0') * 2;

    const columnHeader = header.parentElement!;
    const border = parseFloat(
      getComputedStyle(columnHeader).borderRightWidth || '0'
    );

    const icon = [...wrapper.children].find(x => x.tagName === 'svg');
    const iconWidth = icon ? parseFloat(getComputedStyle(icon).width) : 0;

    const headerWidth = Math.ceil(
      label.scrollWidth + gap + iconWidth + padding + border + 1
    );

    resize.resizeColumn(Math.max(resize.maxWidth, headerWidth, 100));
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      ref={ref}
      onMouseDown={handleDrag}
      onDoubleClick={handleDoubleClick}
      onClick={e => e.stopPropagation()}
      onPointerDown={e => e.stopPropagation()}
      className={classes.resize}
      role="separator"
      aria-orientation="horizontal"
      aria-label="Resize column"
    >
      <div className={classes.line} />
    </div>
  );
};
