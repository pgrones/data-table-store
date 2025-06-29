import { usePagination } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';

export const Pagination = createOverridablePolymorphicComponent(props => (
  <PolymorphicRoot {...props} />
));

export const DefaultPagination = Pagination.as<React.ComponentProps<'div'>>(
  props => {
    const { currentPage, totalPages, setPage } = usePagination();

    return (
      <div style={{ display: 'flex', gap: 8 }} {...props}>
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => setPage(currentPage - 1)}
        >
          {'<<'}
        </button>
        {currentPage}
        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          {'>>'}
        </button>
      </div>
    );
  }
);
