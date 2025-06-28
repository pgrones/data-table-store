import { createPolymorphicComponent } from './createPolymorphicComponent';

type As<TInjectedProps, TRequiredProps> = <TProps>(
  component: (
    props: TInjectedProps & TProps
  ) => React.ReactElement | null | undefined
) => (props: TProps & TRequiredProps) => React.ReactElement | null | undefined;

export type InjectableComponent<TInjectedProps> = (
  props: TInjectedProps
) => React.ReactElement;

export const createOverridablePolymorphicComponent = <
  InjectedProps,
  RequiredProps = object
>(
  component: (props: RequiredProps) => React.ReactElement
): { as: As<InjectedProps, RequiredProps> } => {
  const Component = createPolymorphicComponent<unknown, unknown>(component);

  return {
    as: component => props => (
      <Component<unknown> {...props} component={component} />
    )
  };
};
