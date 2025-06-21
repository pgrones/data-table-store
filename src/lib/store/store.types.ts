type Primitive =
  | string
  | number
  | boolean
  | null
  | undefined
  | symbol
  | bigint
  | Error;

type IsPlainObject<T> = T extends object
  ? T extends Primitive | (() => unknown)
    ? false
    : string extends keyof T
    ? false
    : true
  : false;

type PathImpl<K extends string | number, V> = V extends Primitive
  ? `${K}`
  : V extends Array<unknown>
  ? `${K}` | `${K}.${number}`
  : V extends Array<infer U>
  ? IsPlainObject<U> extends true
    ? `${K}` | `${K}.${number}` | `${K}.${number}.${Path<U>}`
    : `${K}` | `${K}.${number}`
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

export type ArrayPath<T> = Path<T> extends infer P
  ? P extends string
    ? PathValue<T, P> extends Array<unknown>
      ? P
      : never
    : never
  : never;

export type Subscriber<TState> = (state: TState) => void;

export type Unsubscribe = () => boolean;
