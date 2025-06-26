import { useDataTablePaging } from '../../hooks';
import { useDataTable } from '../../index';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export const Pagination = createOverridablePolymorphicComponent<
  'button',
  PaginationProps
>(props => {
  const dataTable = useDataTable();
  const { currentPage, totalPages } = useDataTablePaging();

  return (
    <PolymorphicRoot<InjectableComponent<PaginationProps>>
      {...props}
      currentPage={currentPage}
      totalPages={totalPages}
      setPage={dataTable.setPage}
    />
  );
});

export const DefaultPagination = Pagination.as<React.ComponentProps<'div'>>(
  ({ currentPage, totalPages, setPage, ...props }) => (
    <div style={{ display: 'flex', gap: 8 }} {...props}>
      <button
        disabled={currentPage === 1}
        onClick={() => setPage(currentPage - 1)}
      >
        {'<<'}
      </button>
      {currentPage}
      <button
        disabled={currentPage === totalPages}
        onClick={() => setPage(currentPage + 1)}
      >
        {'>>'}
      </button>
    </div>
  )
);
