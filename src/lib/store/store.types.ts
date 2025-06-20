type Primitive = string | number | boolean | null | undefined | symbol | bigint;

type PathImpl<K extends string | number, V> = V extends Primitive | Error
  ? `${K}`
  : V extends Array<unknown>
  ? `${K}` | `${K}.${number}`
  : V extends Array<infer U>
  ? U extends Primitive | unknown
    ? `${K}` | `${K}.${number}`
    : `${K}` | `${K}.${number}` | `${K}.${number}.${Path<U>}`
  : `${K}` | `${K}.${Path<V>}`;

export type Path<T> = {
  [K in keyof T & (string | number)]: PathImpl<K, T[K]>;
}[keyof T & (string | number)];

export type PathValue<
  T,
  P extends string
> = P extends `${infer K}.${infer Rest}`
  ? T extends Array<infer U>
    ? K extends `${number}`
      ? PathValue<U, Rest>
      : never
    : K extends keyof T
    ? PathValue<T[K], Rest>
    : never
  : T extends Array<infer U>
  ? P extends `${number}`
    ? U
    : never
  : P extends keyof T
  ? T[P]
  : never;

export type Changes<TState> = Partial<{
  [K in Path<TState>]: PathValue<TState, K>;
}>;

export type Subscriber<TState> = (
  state: TState,
  changedProperties: Path<TState>[]
) => void;

export type Unsubscribe = () => boolean;

export type Updater<TPrevValue, TValue> = (prevValue: TPrevValue) => TValue;

export type ValueOrUpdater<TPrevValue, TValue> =
  | TValue
  | Updater<TPrevValue, TValue>;

export type ValueOrArrayUpdater<TPrevValue, TValue> =
  | TValue
  | TValue[]
  | Updater<TPrevValue, TValue>
  | Updater<TPrevValue, TValue[]>;

export type KeysWithArrayValues<TEntity> = {
  [TKey in keyof TEntity]: TEntity[TKey] extends unknown[] ? TKey : never;
}[keyof TEntity];

export type ArrayValue<
  TEntity,
  TKey extends KeysWithArrayValues<TEntity>
> = TEntity[TKey] extends unknown[] ? TEntity[TKey][number] : never;

export const isUpdater = <TPrevValue, TValue>(
  value: ValueOrUpdater<TPrevValue, TValue>
): value is Updater<TPrevValue, TValue> => typeof value === "function";

export const isArrayIndex = (
  value: Record<PropertyKey, unknown> | unknown[],
  _: string | number
): _ is number => Array.isArray(value);
