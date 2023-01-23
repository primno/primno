export type StringPropertyObject = { [key: string]: string | undefined };
export type NoUndefinedColumn<T> = { [P in keyof T]-?: NoUndefinedColumn<NonNullable<T[P]>> };
export type RecursiveNoUndefined<T> = NonNullable<NoUndefinedColumn<T>>;
export type IfElse<TValue, TExtends, TTrue, TFalse> = TValue extends TExtends ? TTrue : TFalse;

/**
 * Replaces the property types of the object with the one specified in TReplace. 
 */
export type PropertyTypeReplacer<TObject extends Record<string, unknown>, TNewType> = { [P in keyof TObject]: TNewType };

// Recursive partial

export type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends Record<string, unknown> ? RecursivePartial<T[P]> :
    T[P];
};

export type CanBePromise<T> = T | Promise<T>;

export type Constructor<T = Record<any, any>> = abstract new (...args: any[]) => T;
export type ConstructorOrObject<T extends Record<any, any> = Record<any, any>> = Constructor<T> | T;

export type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never
  }[keyof T];

export type PickOnly<T, V> = Pick<T, KeysMatching<T, V>>;

/**
 * Replace type of object properties
 */
export type ReplaceProp<T, V> = { [key in keyof T]: V};