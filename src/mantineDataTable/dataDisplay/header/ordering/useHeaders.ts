import { Children, isValidElement, useRef } from 'react';
import { isDataTableColumn, useOrderedColumnKeys } from '@lib';
import { usePrevious } from '@mantine/hooks';
import { hasChildren } from '../hasChildren';

export const useHeaders = (children: React.ReactNode) => {
  const columnKeys = useOrderedColumnKeys();
  const headers = useRef<Map<string, [React.ReactNode, object | null]>>(
    new Map()
  );

  const hashedColumnKeys = columnKeys.toSorted().join();

  const perviousColumnKeys = usePrevious(hashedColumnKeys);

  if (perviousColumnKeys === hashedColumnKeys) return headers;

  columnKeys.forEach(x => {
    const [header, props] = findHeaderRender(children, x) ?? [];

    headers.current.set(x, [
      header === emptyHeader ? null : header,
      props ?? null
    ]);
  });

  return headers;
};

const emptyHeader = '__EMPTY_HEADER__' as const;

const findHeaderRender = (
  node: React.ReactNode,
  columnKey: string
): [React.ReactNode, object] | null => {
  if (!isValidElement(node)) return null;

  if (isDataTableColumn(node)) {
    if (node.props.columnKey === columnKey)
      return [
        node.props.header ?? emptyHeader,
        node.props.headerProps as object
      ];

    return null;
  }

  if (!hasChildren(node.props)) return null;

  for (const child of Children.toArray(node.props.children)) {
    const header = findHeaderRender(child, columnKey);

    if (header !== null) return header;
  }

  return null;
};
