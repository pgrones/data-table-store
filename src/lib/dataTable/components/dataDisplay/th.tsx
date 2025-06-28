import { useEffect, useRef, type PropsWithChildren } from 'react';
import type { Key } from '../../../dataTableStore/dataTableStore.types';
import { useDataTable } from '../../index';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<
  T,
  Exclude<keyof T, Keys>
> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

interface IdFields<TEntity extends object> {
  sortableBy?: Key<TEntity>;
  columnId?: string;
  children?: React.ReactNode;
}

interface ColumnProps {
  resizable?: boolean;
  orderable?: boolean;
  hidable?: boolean;
}

export type RequiredThProps<TEntity extends object = object> =
  RequireAtLeastOne<IdFields<TEntity>> & ColumnProps;

export interface ThProps {
  isSortable: boolean;
  isSorted: boolean;
  descending: boolean;
  toggleSort: () => void;
  isResizable: boolean;
  columnWidth: number | null;
  resize: (width: number) => void;
  isOrderable: boolean;
  postion: number | null;
  reorder: (position: number) => void;
  isHidable: boolean;
  columnVisible: boolean;
  toggleVisibility: (visible?: boolean) => void;
}

export const Th = createOverridablePolymorphicComponent<
  ThProps,
  RequiredThProps
>(
  ({
    sortableBy,
    columnId,
    children,
    hidable,
    orderable,
    resizable,
    ...props
  }) => {
    const key =
      columnId ??
      sortableBy ??
      (typeof children === 'string' ? children : null);

    if (!key)
      throw new Error(
        'A column needs a unique key to identify it. This key can either be columnId, sortableBy, or children (if its a string)'
      );

    const initialized = useRef(false);

    const { initializeColumn, ...column } = useDataTable(state => {
      const column = state.columns.get(key);

      return {
        initializeColumn: state.initializeColumn,
        toggleSort: state.toggleColumnSort,
        resize: state.resizeColumn,
        reorder: state.reorderColumn,
        toggleVisibility: state.toggleColumnVisibility,
        ...column
      };
    });

    useEffect(() => {
      if (initialized.current) return;

      initialized.current = true;

      initializeColumn(key, {
        isHidable: hidable ?? true,
        isOrderable: orderable ?? true,
        isResizable: resizable ?? true,
        sortableBy: ((sortableBy as string | undefined) ?? null) as never
      });
    }, [initializeColumn, key, hidable, orderable, resizable, sortableBy]);

    return (
      <PolymorphicRoot<InjectableComponent<PropsWithChildren<ThProps>>>
        {...props}
        isSortable={!!column.sortableBy}
        isSorted={!!column.isSorted}
        descending={!!column.descending}
        toggleSort={() => column.toggleSort(key)}
        isResizable={!!column.isResizable}
        columnWidth={column.width ?? null}
        resize={(width: number) => column.resize(key, width)}
        isOrderable={!!column.isOrderable}
        postion={column.postion ?? null}
        reorder={(position: number) => column.reorder(key, position)}
        isHidable={!!column.isHidable}
        columnVisible={column.visible ?? true}
        toggleVisibility={(visible?: boolean) =>
          column.toggleVisibility(key, visible)
        }
      >
        {children}
      </PolymorphicRoot>
    );
  }
);

export const DefaultTh = Th.as<React.ComponentProps<'th'>>(
  ({ isSorted, descending, toggleSort, children, ...props }) => (
    <th {...props} onClick={toggleSort}>
      <span>
        {children} {isSorted ? (descending ? '⬇️' : '⬆️') : '↕️'}
      </span>
    </th>
  )
);
