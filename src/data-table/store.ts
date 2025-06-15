type Subscriber<TState extends object> = (s: TState) => void;
type Unsubscribe = () => boolean;

type ValueOrUpdater<
  TState extends object,
  TKey extends KeysWithArrayValues<TState>
> =
  | ArrayValue<TState, TKey>
  | TState[TKey]
  | ((value: TState[TKey]) => ArrayValue<TState, TKey> | TState[TKey]);

type KeysWithArrayValues<T> = {
  [K in keyof T]: T[K] extends unknown[] ? K : never;
}[keyof T];

type ArrayValue<T, K extends KeysWithArrayValues<T>> = T[K] extends unknown[]
  ? T[K][number]
  : never;

const isArrayUpdater = <
  TState extends object,
  TKey extends KeysWithArrayValues<TState>
>(
  value: ValueOrUpdater<TState, TKey>
): value is (
  value: TState[TKey]
) => ArrayValue<TState, TKey> | TState[TKey] => {
  return typeof value === "function";
};

const isUpdater = <TState extends object, TKey extends keyof TState>(
  value: TState[TKey] | ((value: TState[TKey]) => TState[TKey])
): value is (value: TState[TKey]) => TState[TKey] => {
  return typeof value === "function";
};

export class Store<TState extends object> {
  protected state: TState;
  private subscribers: Set<Subscriber<TState>>;

  protected constructor(state: TState) {
    this.state = state;
    this.subscribers = new Set();
  }

  public getSnapshot = () => this.state;

  public subscribe = (subscriber: Subscriber<TState>): Unsubscribe => {
    this.subscribers.add(subscriber);
    return () => this.subscribers.delete(subscriber);
  };

  protected set<TKey extends keyof TState>(
    key: TKey,
    valueOrUpdater: TState[TKey] | ((value: TState[TKey]) => TState[TKey])
  ) {
    this.apply({
      [key]: isUpdater(valueOrUpdater)
        ? valueOrUpdater(this.state[key])
        : valueOrUpdater,
    } as unknown as Partial<TState>);
  }

  protected add<TKey extends KeysWithArrayValues<TState>>(
    key: TKey,
    valueOrUpdater:
      | ArrayValue<TState, TKey>
      | TState[TKey]
      | ((value: TState[TKey]) => ArrayValue<TState, TKey> | TState[TKey])
  ) {
    const addedValues = isArrayUpdater(valueOrUpdater)
      ? valueOrUpdater(this.state[key])
      : valueOrUpdater;

    this.apply({
      [key]: [
        ...(this.state[key] as unknown[]),
        ...(Array.isArray(addedValues) ? addedValues : [addedValues]),
      ],
    } as unknown as Partial<TState>);
  }

  protected remove<TKey extends KeysWithArrayValues<TState>>(
    key: TKey,
    valueOrUpdater:
      | number
      | number[]
      | ((value: TState[TKey]) => number | number[])
  ) {
    let removedIndices =
      typeof valueOrUpdater === "function"
        ? valueOrUpdater(this.state[key])
        : valueOrUpdater;

    removedIndices = Array.isArray(removedIndices)
      ? removedIndices
      : [removedIndices];

    const newState = (this.state[key] as unknown[]).filter(
      (_, index) => !removedIndices.includes(index)
    );

    this.apply({
      [key]: newState,
    } as unknown as Partial<TState>);
  }

  protected apply(changes: Partial<TState>) {
    for (const key in changes) {
      if (
        changes[key] === undefined ||
        Object.is(this.state[key], changes[key])
      ) {
        continue;
      }

      this.update({ ...this.state, ...changes });
      return;
    }
  }

  private update = (newState: TState) => {
    this.state = newState;
    this.subscribers.forEach((subscriber) => subscriber(newState));
  };
}
