export const hasChildren = (props: unknown): props is React.PropsWithChildren =>
  !!props && typeof props === 'object' && Object.hasOwn(props, 'children');
