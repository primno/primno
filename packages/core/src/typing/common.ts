/**
 * @internal
 */
export type StringPropertyObject = { [key: string]: string | undefined };

/**
 * @internal
 */
export type NoUndefinedColumn<T> = { [P in keyof T]-?: NoUndefinedColumn<NonNullable<T[P]>> };

/**
 * @internal
 */
export type RecursiveNoUndefined<T> = NonNullable<NoUndefinedColumn<T>>;

/**
 * @internal
 */
export type IfElse<TValue, TExtends, TTrue, TFalse> = TValue extends TExtends ? TTrue : TFalse;

/**
 * Replaces the property types of the object with the one specified in TReplace. 
 */
export type PropertyTypeReplacer<TObject extends Record<string, unknown>, TNewType> = { [P in keyof TObject]: TNewType };

/**
 * Make all properties of the object optional recursively.
 * @internal
 */
export type RecursivePartial<T> = {
    [P in keyof T]?:
    T[P] extends (infer U)[] ? RecursivePartial<U>[] :
    T[P] extends Record<string, unknown> ? RecursivePartial<T[P]> :
    T[P];
};

/**
 * Define a return of a function that can be a promise or not.
 * @internal
 */
export type CanBePromise<T> = T | Promise<T>;

/**
 * @internal
 */
export type Constructor<T = Record<any, any>> = abstract new (...args: any[]) => T;
/**
 * @internal
 */
export type ConstructorOrObject<T extends Record<any, any> = Record<any, any>> = Constructor<T> | T;

/**
 * @internal
 */
export type KeysMatching<T, V> = {
    [K in keyof T]-?: T[K] extends V ? K : never
  }[keyof T];

/**
 * @internal
 */
export type PickOnly<T, V> = Pick<T, KeysMatching<T, V>>;

/**
 * Replace type of object properties by the specified type (V).
 * @internal
 */
export type ReplaceProp<T, V> = { [key in keyof T]: V};