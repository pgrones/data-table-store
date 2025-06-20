import { produce, type Draft } from "immer";
import {
  isUpdater,
  type ArrayValue,
  type Changes,
  type KeysWithArrayValues,
  type Path,
  type PathValue,
  type Subscriber,
  type Unsubscribe,
  type ValueOrArrayUpdater,
} from "./store.types";

export class Store<TState extends object> {
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

  protected set<TPath extends Path<TState>>(
    path: TPath,
    value: PathValue<TState, TPath>
  ) {
    this.apply({ [path]: value } as unknown as Changes<TState>);
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
    } as Changes<TState>);
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

    this.apply({ [key]: newState } as Changes<TState>);
  }

  protected apply(changes: Changes<TState>) {
    const values = Object.entries(changes) as [Path<TState>, unknown][];

    if (values.length === 0) return;

    const state = produce(this.state, (draftState) => {
      for (const [path, value] of values) {
        this.setByPath(draftState, path, value);
      }
    });

    this.update(
      state,
      values.map(([path]) => path)
    );
  }

  private parsePath(path: string): (string | number)[] {
    return path
      .split(".")
      .map((key) => (key.match(/^\d+$/) ? parseInt(key) : key));
  }

  private setByPath(obj: Draft<TState>, path: Path<TState>, value: unknown) {
    const keys = this.parsePath(path);

    if (!keys.length) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current = obj as any;

    const validateCurrent = (i?: number) => {
      if (
        (typeof current !== "object" || current === null) &&
        !Array.isArray(current)
      ) {
        throw new Error(
          `Cannot index non-object at ${keys.slice(0, i).join(".")}`
        );
      }
    };

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];

      validateCurrent(i);

      if (!(key in current)) {
        const defaultValue = typeof keys[i + 1] === "number" ? [] : {};
        current[key] = defaultValue;
      }

      current = current[key];
    }

    validateCurrent();

    current[keys.at(-1)!] = value;
  }

  private update = (state: TState, changedProperties: Path<TState>[]) => {
    this.state = state;
    this.subscribers.forEach((subscriber) =>
      subscriber(state, changedProperties)
    );
  };
}
