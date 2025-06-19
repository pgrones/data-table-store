export type Subscriber<TState> = (state: TState) => void;

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
