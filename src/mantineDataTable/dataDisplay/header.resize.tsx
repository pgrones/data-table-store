import { useLayoutEffect, useRef } from 'react';
import { useResize } from '@lib';
import classes from './header.module.css';

interface HeaderResizeProps {
  columnKey: string;
}

export const HeaderResize = ({ columnKey }: HeaderResizeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>(null);
  const resize = useResize(columnKey);

  useLayoutEffect(() => cleanupRef.current?.(), []);

  if (!resize?.isResizable) return null;

  const handleDrag = () => {
    cleanupRef.current?.();

    if (!ref.current) return;

    const column = ref.current.parentElement;

    if (!column) return;

    let isDragging = false;
    const rect = column.getBoundingClientRect();
    const minDistanceToLeftEdge = Math.min(100, rect.width);

    const blocker = document.createElement('div');
    blocker.className = classes.blocker!;

    const handleMove = ({ x }: MouseEvent) => {
      if (!isDragging) {
        isDragging = true;
        document.body.appendChild(blocker);
      }

      if (!ref.current) return;

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

      if (!ref.current) return;

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

    const icon = [...wrapper.children].find(x => x.tagName === 'svg');
    const iconWidth = icon ? parseFloat(getComputedStyle(icon).width) : 0;

    const headerWidth = Math.ceil(
      label.scrollWidth + gap + iconWidth + padding + 1
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
      className={classes.resize}
      role="separator"
      aria-orientation="horizontal"
      aria-label="Resize column"
    >
      <div className={classes.line} />
    </div>
  );
};
