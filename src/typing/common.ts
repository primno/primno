export type StringPropertyObject = { [key: string]: string | undefined };
export type NoUndefinedField<T> = { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> };
export type RecursiveNoUndefined<T> = NonNullable<NoUndefinedField<T>>;
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

export type CanBePromise<T> = T | PromiseLike<T>;
