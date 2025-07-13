import { useResize, useTableKey } from '@lib';

export const minWidth = 120;

export const useAutoResize = (columnKey: string) => {
  const tableKey = useTableKey();
  const resize = useResize(columnKey);

  return () => {
    if (!resize?.maxWidth) return;

    const column = document
      .getElementById(tableKey)
      ?.querySelector(`#${columnKey}`);

    if (!column) return;

    const gap = parseFloat(getComputedStyle(column).columnGap || '0');
    const padding =
      parseFloat(getComputedStyle(column).paddingInline || '0') * 2;
    const border = parseFloat(
      getComputedStyle(column.parentElement!).borderRightWidth || '0'
    );

    const [wrapper, menu] = [...column.children];

    const labelWrapper = wrapper!.firstElementChild!;

    const [label, sortIcon] = [...labelWrapper.children];

    const innerGap = sortIcon
      ? parseFloat(getComputedStyle(labelWrapper).columnGap || '0')
      : 0;
    const sortIconWidth = sortIcon
      ? parseFloat(getComputedStyle(sortIcon).width)
      : 0;
    const menuWidth = menu ? parseFloat(getComputedStyle(menu).width) : 0;

    const headerWidth = Math.ceil(
      label!.scrollWidth +
        gap +
        innerGap +
        sortIconWidth +
        menuWidth +
        padding +
        border +
        1
    );

    resize.resizeColumn(Math.max(resize.maxWidth, headerWidth, minWidth));
  };
};
