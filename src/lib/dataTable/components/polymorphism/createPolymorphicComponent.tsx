import type React from "react";

type ExtendedProps<Props = object, OverrideProps = object> = OverrideProps &
  Omit<Props, keyof OverrideProps>;

type ElementType =
  | keyof React.JSX.IntrinsicElements
  | React.JSXElementConstructor<unknown>;

type PropsOf<C extends ElementType> = React.JSX.LibraryManagedAttributes<
  C,
  React.ComponentPropsWithoutRef<C>
>;

type ComponentProp<C> = {
  component?: C;
};

type InheritedProps<C extends ElementType, Props = object> = ExtendedProps<
  PropsOf<C>,
  Props
>;

export type PolymorphicRef<C> = C extends React.ElementType
  ? React.ComponentPropsWithRef<C>["ref"]
  : never;

export type PolymorphicComponentProps<
  C,
  Props = object
> = C extends React.ElementType
  ? InheritedProps<C, Props & ComponentProp<C>> & {
      ref?: PolymorphicRef<C>;
      renderRoot?: (props: unknown) => unknown;
    }
  : Props & {
      component: React.ElementType;
      renderRoot?: (props: Record<string, unknown>) => unknown;
    };

export const createPolymorphicComponent = <
  ComponentDefaultType,
  Props,
  StaticComponents = Record<string, never>
>(
  component: unknown
) => {
  type ComponentProps<C> = PolymorphicComponentProps<C, Props>;

  type _PolymorphicComponent = <C = ComponentDefaultType>(
    props: ComponentProps<C>
  ) => React.ReactElement;

  type ComponentProperties = Omit<
    React.FunctionComponent<ComponentProps<unknown>>,
    never
  >;

  type PolymorphicComponent = _PolymorphicComponent &
    ComponentProperties &
    StaticComponents;

  return component as PolymorphicComponent;
};
