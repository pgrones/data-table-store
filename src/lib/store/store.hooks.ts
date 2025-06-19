import isEqual from "fast-deep-equal";
import { useCallback, useSyncExternalStore } from "react";
import { createSelectorCreator, lruMemoize } from "reselect";
import type { Store } from "./store";

type Selector<TSnapshot, TResult> = (
  state: TSnapshot,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...args: any[]
) => TResult;

export const createSelector = <T>() =>
  createSelectorCreator({
    memoize: lruMemoize,
    memoizeOptions: {
      maxSize: 50,
      equalityCheck: isEqual,
      resultEqualityCheck: isEqual,
    },
  }).withTypes<T>();

export const useSelector = <TEntity, TValue>(
  store: Store<TEntity>,
  selector: Selector<TEntity, TValue>,
  ...args: unknown[]
) => {
  const getSnapshot = useCallback(
    () => selector(store.getSnapshot(), ...args),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store, selector, ...args]
  );

  const selectedValue = useSyncExternalStore(store.subscribe, getSnapshot);

  return selectedValue;
};
