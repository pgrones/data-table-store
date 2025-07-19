import { useCellValue, useColumnDimensions } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot
} from '../polymorphism';
import { CellContext, useCell } from './cell.context';
import { useColumnContext } from './column.context';
import { useRowContext } from './row.context';

export const Cell = createOverridablePolymorphicComponent(props => {
  const { rowKey } = useRowContext();
  const { columnKey, cell } = useColumnContext();
  const cellValue = useCellValue(rowKey, columnKey);
  const { width, position } = useColumnDimensions(columnKey);

  const value =
    typeof cell === 'function'
      ? cell({ value: cellValue })
      : cell !== undefined
        ? cell
        : (cellValue as React.ReactNode);

  return (
    <div
      role="cell"
      className="data-table-cell"
      style={{ width, gridColumn: position! + 1 }}
    >
      <CellContext value={{ value, cellValue, columnKey, rowKey }}>
        <PolymorphicRoot {...props} />
      </CellContext>
    </div>
  );
});

export const DefaultCell = Cell.as<React.ComponentProps<'div'>>(props => {
  const { value } = useCell();

  return <div {...props}>{value}</div>;
});
