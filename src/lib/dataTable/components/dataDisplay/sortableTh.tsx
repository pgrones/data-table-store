import type { Key } from '../../../dataTableStore/dataTableStore.types';
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
  SortableThProps,
  RequiredSortableThProps
>(({ sortBy, ...props }) => {
  const { isSorted, desc, toggleSort } = useDataTable(state => {
    const isSorted = (state.sortBy as unknown) === sortBy;

    return {
      isSorted,
      desc: isSorted && !!state.descending,
      toggleSort: state.toggleSort
    };
  });

  return (
    <PolymorphicRoot<InjectableComponent<SortableThProps>>
      {...props}
      isSorted={isSorted}
      descending={desc}
      toggleSort={() => toggleSort(sortBy)}
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
