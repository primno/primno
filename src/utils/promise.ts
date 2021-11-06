import { CanBePromise } from '../typing';
import { isPromise } from './common';

/**
 * Makes synchronous calls as much as possible, otherwise builds a promise of fulfillment.
 * Returns the direct return value if possible otherwise a promise returning the value.
 */
export class MaybePromise<T> {
    private returnValue: CanBePromise<T>;

    public constructor(func: () => CanBePromise<T>) {
        this.returnValue = func();
    }

    public then<TResult>(func: (value: T) => CanBePromise<TResult>): MaybePromise<TResult> {
        if (isPromise(this.returnValue)) {
            return new MaybePromise(() => (this.returnValue as PromiseLike<T>).then(func));
        }
        else {
            return new MaybePromise(() => func(this.returnValue as T));
        }
    }

    public done(): CanBePromise<T> {
        return this.returnValue;
    }
}
