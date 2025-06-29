import type React from 'react';
import {
  createOverridablePolymorphicComponent,
  PolymorphicRoot,
  type InjectableComponent
} from './polymorphism';

export interface RequiredDataTableProps {
  verticalSpacing?: string | number;
  stickyHeader?: boolean;
  highlightOnHover?: boolean;
  highlightOnSelect?: boolean;
  striped?: boolean;
  withRowBorders?: boolean;
  withColumnBorders?: boolean;
}

export interface DataTableProps {
  dataTable: RequiredDataTableProps;
}

export const DataTable = createOverridablePolymorphicComponent<
  DataTableProps,
  RequiredDataTableProps
>(
  ({
    verticalSpacing,
    stickyHeader,
    highlightOnHover,
    highlightOnSelect,
    striped,
    withRowBorders,
    withColumnBorders,
    ...props
  }) => {
    return (
      <PolymorphicRoot<InjectableComponent<DataTableProps>>
        {...props}
        dataTable={{
          verticalSpacing,
          stickyHeader,
          highlightOnHover,
          highlightOnSelect,
          striped,
          withRowBorders,
          withColumnBorders
        }}
      />
    );
  }
);

export const DefaultDataTable = DataTable.as<React.ComponentProps<'div'>>(
  ({ dataTable, children, ...props }) => {
    return <div {...props}>{children}</div>;
  }
);

// const DataTable = ({ children }) => {
//   const columns = React.Children.toArray(children).filter(
//     child => isValidElement(child) && child.type === Column
//   );

//   const headers = columns.map(col => {
//     const header = React.Children.toArray(col.props.children).find(
//       child => isValidElement(child) && child.type === Header
//     );
//     return header;
//   });

//   const cells = columns.map(col => {
//     const cell = React.Children.toArray(col.props.children).find(
//       child => isValidElement(child) && child.type === Cell
//     );
//     return cell;
//   });

//   return (
//     <>
//       <thead>
//         <tr>{headers}</tr>
//       </thead>
//       <tbody>
//         {rows.map(row => (
//           <tr>
//             {cells.map(CellEl => (
//               // Clone the Cell with whatever row/context you need
//               React.cloneElement(CellEl, { row })
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     </>
//   );
// };
