import React, { memo } from 'react';

type TypedMemo = <
  TComponent extends (
    props: React.ComponentProps<TComponent>
  ) => React.ReactNode
>(
  Component: TComponent,
  propsAreEqual?: Parameters<typeof memo>[1]
) => TComponent;

export const typedMemo: TypedMemo = (Component, propsAreEqual) =>
  memo(Component, propsAreEqual) as unknown as typeof Component;
