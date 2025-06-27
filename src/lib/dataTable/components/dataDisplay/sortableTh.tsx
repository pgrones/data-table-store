import type { Key } from '../../../dataTableStore/dataTableStore.types';
import { useDataTableSort } from '../../hooks';
import { useDataTable } from '../../index';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface RequiredSortableThProps<TEntity extends object = object> {
  sortBy: Key<TEntity>;
  columnId?: string;
  children?: React.ReactNode;
}

export interface SortableThProps {
  isSorted: boolean;
  descending: boolean;
  toggleSort: () => void;
}

export const SortableTh = createOverridablePolymorphicComponent<
  'th',
  SortableThProps,
  RequiredSortableThProps
>(({ sortBy: columnKey, ...props }) => {
  const dataTable = useDataTable();
  const { isSorted, desc } = useDataTableSort(columnKey);

  return (
    <PolymorphicRoot<InjectableComponent<SortableThProps>>
      {...props}
      isSorted={isSorted}
      descending={desc}
      toggleSort={() => dataTable.toggleSort(columnKey)}
    />
  );
});

export const DefaultSortableTh = SortableTh.as<React.ComponentProps<'th'>>(
  ({ isSorted, descending, toggleSort, children, ...props }) => (
    <th {...props} onClick={toggleSort}>
      <span>
        {children} {isSorted ? (descending ? '⬇️' : '⬆️') : '↕️'}
      </span>
    </th>
  )
);
