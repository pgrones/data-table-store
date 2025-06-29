import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { Th as DataTableTh } from '@lib';
import { Group, Portal, Table, type TableThProps } from '@mantine/core';
import { IconArrowsSort, IconSortAscending } from '@tabler/icons-react';
import classes from './th.module.css';

export const Th = DataTableTh.as<
  TableThProps & { ref?: React.RefObject<HTMLTableCellElement> }
>(
  ({
    isSortable,
    isSorted,
    descending,
    toggleSort,
    isResizable,
    columnWidth,
    resize,
    isOrderable,
    postion,
    reorder,
    isHidable,
    columnVisible,
    toggleVisibility,
    onClick,
    className = '',
    children,
    ref,
    ...props
  }) => {
    const [columnRef, setColumnRef] = useState<HTMLTableCellElement | null>(
      null
    );

    const isRightAligned = props.ta === 'right' || props.ta === 'end';

    const handleClick = (e: React.MouseEvent<HTMLTableCellElement>) => {
      if (isSortable) toggleSort();
      onClick?.(e);
    };

    const mergedClasses = `${classes.header} ${className}`;

    return (
      <Table.Th
        {...props}
        className={mergedClasses}
        onClick={handleClick}
        data-sortable={isSortable}
        data-sorted={isSorted}
        data-descending={descending}
        data-resizable={isResizable}
        style={{ width: columnWidth ?? undefined }}
        ref={r => {
          setColumnRef(r);
          if (ref && r) ref.current = r;
        }}
      >
        {isSortable ? (
          <Group
            gap="xs"
            wrap="nowrap"
            justify="space-between"
            style={{ flexDirection: isRightAligned ? 'row-reverse' : 'row' }}
          >
            {typeof children === 'string' ? (
              <span className={classes.text}>{children}</span>
            ) : (
              children
            )}

            {isSorted ? (
              <IconSortAscending size={20} stroke={1.5} />
            ) : (
              <IconArrowsSort size={20} stroke={1.5} data-default />
            )}
          </Group>
        ) : (
          children
        )}

        {isResizable && columnRef && (
          <ResizeHandle columnRef={columnRef} resize={resize} />
        )}
      </Table.Th>
    );
  }
);

interface ResizeHandleProps {
  columnRef: HTMLDivElement;
  resize: (width: number) => void;
}

interface Positions {
  top: number;
  right: number;
  left: number;
  height: number;
  width: number;
  tableHeight: number;
  tableRight: number;
}

const handleOffset = 9;

// TODO: handle resizes (maybe table layout auto with absolute postions?)

export const ResizeHandle = ({ columnRef, resize }: ResizeHandleProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const scrollContainer = useMemo(
    () => getScrollParent(columnRef),
    [columnRef]
  );

  const calculatePositions = useCallback(() => {
    const { top, right, left, height, width } =
      columnRef.getBoundingClientRect();

    const tableHeight = scrollContainer.clientHeight;
    const tableRight = scrollContainer.getBoundingClientRect().right;

    return { top, right, left, height, width, tableHeight, tableRight };
  }, [columnRef, scrollContainer]);

  const [
    { top, right, left, height, width, tableHeight, tableRight },
    setPostions
  ] = useState<Positions>(calculatePositions());

  useEffect(() => {
    const columns = document
      .querySelector('[data-data-table]')
      ?.getElementsByTagName('th');

    const observer = new ResizeObserver(() => {
      setPostions(calculatePositions());
    });

    if (!columns) return () => observer.disconnect();

    observer.observe(scrollContainer);

    [...columns].forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [columnRef, calculatePositions, scrollContainer]);

  const handleDrag = () => {
    if (!ref.current) return;

    const eventBlocker = document.createElement('div');
    eventBlocker.className = classes.blocker!;
    document.body.append(eventBlocker);

    const handleMove = ({ x }: MouseEvent) => {
      if (!ref.current) return;
      // 50px from the left edge of the column
      if (x < left + Math.min(50, width) + handleOffset) return;
      // At the right edge of the table
      if (x > tableRight) return;

      ref.current.style.left = `${x - handleOffset}px`;
    };

    window.addEventListener('mousemove', handleMove);

    const handleMouseup = () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleMouseup);
      document.body.removeChild(eventBlocker);

      if (!ref.current) return;

      resize(parseFloat(ref.current.style.left) + handleOffset - left);
    };

    window.addEventListener('mouseup', handleMouseup);
  };

  return (
    <Portal reuseTargetNode>
      <div
        ref={ref}
        onMouseDown={handleDrag}
        role="button"
        tabIndex={-1}
        className={classes.handle}
        style={
          {
            top,
            height,
            'left': right - handleOffset,
            '--data-table-height': tableHeight + 'px'
          } as React.CSSProperties
        }
      >
        <div className={classes.line} />
      </div>
    </Portal>
  );
};

const isScrollable = (node: Element) => {
  if (!(node instanceof HTMLElement || node instanceof SVGElement)) {
    return false;
  }

  const style = getComputedStyle(node);

  return ['overflow', 'overflow-x', 'overflow-y'].some(propertyName => {
    const value = style.getPropertyValue(propertyName);
    return value === 'auto' || value === 'scroll';
  });
};

const getScrollParent = (node: Element): Element => {
  let currentParent = node.parentElement;

  while (currentParent) {
    if (isScrollable(currentParent)) {
      return currentParent;
    }
    currentParent = currentParent.parentElement;
  }

  return document.scrollingElement ?? document.documentElement;
};
