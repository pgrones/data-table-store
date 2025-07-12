import { useCellValue, useColumnDimensions } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from '../polymorphism';
import { useColumnContext } from './column.context';
import { useRowContext } from './row.context';

export interface CellProps {
  cellValue: React.ReactNode;
}

export const Cell = createOverridablePolymorphicComponent<CellProps>(props => {
  const { rowKey } = useRowContext();
  const { columnKey, cell } = useColumnContext();
  const value = useCellValue(rowKey, columnKey);
  const { width, position } = useColumnDimensions(columnKey);

  const cellValue =
    typeof cell === 'function'
      ? cell({ value })
      : cell !== undefined
        ? cell
        : (value as React.ReactNode);

  return (
    <div
      role="cell"
      className="data-table-cell"
      style={{ width, gridColumn: position && position + 1 }}
    >
      <PolymorphicRoot<InjectableComponent<CellProps>>
        {...props}
        cellValue={cellValue}
      />
    </div>
  );
});

export const DefaultCell = Cell.as<React.ComponentProps<'div'>>(
  ({ cellValue: value, ...props }) => {
    return <div {...props}>{value}</div>;
  }
);
