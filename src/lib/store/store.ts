import { produce, type Draft } from "immer";
import {
  type ArrayPath,
  type Changes,
  type Path,
  type PathValue,
  type Subscriber,
  type Unsubscribe,
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

  public set<TPath extends Path<TState>>(
    path: TPath,
    value: PathValue<TState, TPath>
  ) {
    this.apply({ [path]: value } as unknown as Changes<TState>);
  }

  public addListItem(path: ArrayPath<TState>, ...values: unknown[]) {
    const state = produce(this.state, (draftState) => {
      this.executeByPath(draftState, path, (obj, key) =>
        (obj[key] as unknown[]).push(...values)
      );
    });

    this.update(state);
  }

  public removeListItem(path: ArrayPath<TState>, ...indices: number[]) {
    const state = produce(this.state, (draftState) => {
      this.executeByPath(
        draftState,
        path,
        (obj, key) =>
          (obj[key] = (obj[key] as unknown[]).filter(
            (_, index) => !indices.includes(index)
          ))
      );
    });

    this.update(state);
  }

  public apply(changes: Changes<TState>) {
    const values = Object.entries(changes) as [Path<TState>, unknown][];

    if (values.length === 0) return;

    const state = produce(this.state, (draftState) => {
      for (const [path, value] of values) {
        this.executeByPath(draftState, path, (obj, key) => (obj[key] = value));
      }
    });

    this.update(state);
  }

  public delete(path: Path<TState>) {
    const state = produce(this.state, (draftState) => {
      this.executeByPath(draftState, path, (obj, key) => delete obj[key]);
    });

    this.update(state);
  }

  private parsePath(path: string): (string | number)[] {
    return path
      .split(".")
      .map((key) => (key.match(/^\d+$/) ? parseInt(key) : key));
  }

  private executeByPath(
    obj: Draft<TState>,
    path: Path<TState>,
    callback: (
      property: Record<string | number, unknown>,
      key: string | number
    ) => void
  ) {
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

    callback(current, keys.at(-1)!);
  }

  private update = (state: TState) => {
    this.state = state;
    this.subscribers.forEach((subscriber) => subscriber(state));
  };
}
