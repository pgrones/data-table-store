import { useDataTable } from '../../dataTable.context';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface DataStateProps {
  isPending: boolean;
}

export const DataState = createOverridablePolymorphicComponent<DataStateProps>(
  props => {
    const isPending = useDataTable(state => state.isPending);

    return (
      <PolymorphicRoot<InjectableComponent<DataStateProps>>
        {...props}
        isPending={isPending}
      />
    );
  }
);

export const DefaultDataState = DataState.as<React.ComponentProps<'div'>>(
  ({ isPending, ...props }) => {
    if (!isPending) return null;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100
        }}
        {...props}
      >
        Loading...
      </div>
    );
  }
);
