import isEqual from "fast-deep-equal";
import {
  isUpdater,
  type ArrayValue,
  type KeysWithArrayValues,
  type Subscriber,
  type Unsubscribe,
  type ValueOrArrayUpdater,
  type ValueOrUpdater,
} from "./store.types";
import { produce } from "immer";

export class Store<TState> {
  protected state: TState;
  private subscribers: Set<Subscriber<TState>>;

  public constructor(state: TState) {
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
    valueOrUpdater: ValueOrArrayUpdater<TState[TKey], ArrayValue<TState, TKey>>
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
    valueOrUpdater: ValueOrArrayUpdater<TState[TKey], number>
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
    const changedState = this.getChanges(changes);

    if (Object.keys(changedState).length === 0) return;

    const state = produce(this.state, (draftState) => {
      for (const key in changedState) {
        // @ts-expect-error Immer cannot handle indexed property assignments
        draftState[key] = changedState[key]!;
      }
    });

    this.update(state);
  }

  private getChanges(changes: Partial<TState>) {
    const changedState: Partial<TState> = {};

    for (const key in changes) {
      if (
        changes[key] !== undefined &&
        !isEqual(this.state[key], changes[key])
      ) {
        changedState[key] = changes[key];
      }
    }

    return changedState;
  }

  private update = (state: TState) => {
    this.state = state;
    this.subscribers.forEach((subscriber) => subscriber(state));
  };
}
