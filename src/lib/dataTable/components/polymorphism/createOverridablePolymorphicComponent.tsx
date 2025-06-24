import { createPolymorphicComponent } from "./createPolymorphicComponent";

type As<TInjectedProps, TRequiredProps> = <TProps>(
  component: (props: TInjectedProps & TProps) => React.ReactElement
) => (props: TProps & TRequiredProps) => React.ReactElement;

export type InjectableComponent<TInjectedProps> = (
  props: TInjectedProps
) => React.ReactElement;

export const createOverridablePolymorphicComponent = <
  DefaultType,
  InjectedProps,
  RequiredProps = object
>(
  component: (props: RequiredProps) => React.ReactElement
): { as: As<InjectedProps, RequiredProps> } => {
  const Component = createPolymorphicComponent<DefaultType, unknown>(component);

  return {
    as: (component) => (props) =>
      <Component<unknown> {...props} component={component} />,
  };
};
