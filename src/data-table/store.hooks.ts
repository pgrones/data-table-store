import { useMemo, useSyncExternalStore } from "react";
import type { Primitive } from "./shared.types";
import type { Store } from "./store";

type Selector<TEntity extends object, TResult extends Primitive = Primitive> = (
  state: TEntity
) => TResult;

type ReturnTypes<TEntity extends object, TDeps> = {
  [Index in keyof TDeps]: TDeps[Index] extends (state: TEntity) => infer R
    ? R
    : never;
};

export const useMemoizedSelector = <
  TEntity extends object,
  TDeps extends readonly Selector<TEntity>[],
  TResult
>(
  store: Store<TEntity>,
  deps: TDeps,
  selector: (...args: ReturnTypes<TEntity, TDeps>) => TResult
) => {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  const dependencies = deps.map((fn) => fn(state)) as ReturnTypes<
    TEntity,
    TDeps
  >;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const value = useMemo(() => selector(...dependencies), dependencies);

  return value;
};

export const useSelector = <TEntity extends object, TValue extends Primitive>(
  store: Store<TEntity>,
  selector: Selector<TEntity, TValue>
) => {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  return selector(state);
};

export function createSelectorFor<TEntity extends object>() {
  return <TDeps extends readonly Selector<TEntity>[]>(
    ...selectors: TDeps
  ): TDeps => selectors;
}
