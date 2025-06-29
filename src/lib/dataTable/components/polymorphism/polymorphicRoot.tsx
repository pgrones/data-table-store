import { createPolymorphicComponent } from './createPolymorphicComponent';

export interface PolymorphicRootProps {
  component?: React.ElementType;
  renderRoot?: (props: unknown) => React.ReactNode;
}

export const PolymorphicRoot = createPolymorphicComponent<
  'div',
  PolymorphicRootProps
>(({ component, renderRoot, ...props }: PolymorphicRootProps) => {
  const Element = component ?? 'div';

  return typeof renderRoot === 'function' ? (
    renderRoot(props)
  ) : (
    <Element {...props} />
  );
});
