import { useDataTableLoadingState } from '../../hooks';
import {
  createOverridablePolymorphicComponent,
  type InjectableComponent
} from '../polymorphism/createOverridablePolymorphicComponent';
import { PolymorphicRoot } from '../polymorphism/polymorphicRoot';

export interface DataStateProps {
  isPending: boolean;
  pendingTimeout: number;
}

export const DataState = createOverridablePolymorphicComponent<
  'div',
  DataStateProps
>(props => {
  const { isPending, timeout } = useDataTableLoadingState();

  return (
    <PolymorphicRoot<InjectableComponent<DataStateProps>>
      {...props}
      isPending={isPending}
      pendingTimeout={timeout}
    />
  );
});

export const DefaultDataState = DataState.as<React.ComponentProps<'div'>>(
  ({ isPending, pendingTimeout: _, ...props }) => {
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
