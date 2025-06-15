import {
  isUpdater,
  type ArrayValue,
  type KeysWithArrayValues,
  type Subscriber,
  type Unsubscribe,
  type ValueOrUpdater,
  type ValueOrArrayUpdaters,
} from "./store.types";

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
    valueOrUpdater: ValueOrUpdater<TState[TKey], TState[TKey]>
  ) {
    const value = isUpdater(valueOrUpdater)
      ? valueOrUpdater(this.state[key])
      : valueOrUpdater;

    this.apply({ [key]: value } as unknown as Partial<TState>);
  }

  protected addListItem<TKey extends KeysWithArrayValues<TState>>(
    key: TKey,
    valueOrUpdater: ValueOrArrayUpdaters<TState[TKey], ArrayValue<TState, TKey>>
  ) {
    let addedValues = isUpdater(valueOrUpdater)
      ? valueOrUpdater(this.state[key])
      : valueOrUpdater;

    addedValues = Array.isArray(addedValues)
      ? addedValues
      : ([addedValues] as ArrayValue<TState, TKey>[]);

    this.apply({
      [key]: [
        ...(this.state[key] as ArrayValue<TState, TKey>[]),
        ...addedValues,
      ],
    } as Partial<TState>);
  }

  protected removeListItem<TKey extends KeysWithArrayValues<TState>>(
    key: TKey,
    valueOrUpdater: ValueOrArrayUpdaters<TState[TKey], number>
  ) {
    let removedIndices =
      typeof valueOrUpdater === "function"
        ? valueOrUpdater(this.state[key])
        : valueOrUpdater;

    removedIndices = Array.isArray(removedIndices)
      ? removedIndices
      : [removedIndices];

    const newState = (this.state[key] as ArrayValue<TState, TKey>[]).filter(
      (_, index) => !removedIndices.includes(index)
    );

    this.apply({ [key]: newState } as Partial<TState>);
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
