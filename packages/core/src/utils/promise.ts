import { CanBePromise } from '../typing';
import { isPromise } from './common';

/**
 * Makes synchronous calls as much as possible, otherwise builds a promise of fulfillment.
 * Returns the direct return value if possible otherwise a promise returning the value.
 */
export class MaybePromise<T> {
    private returnValue!: CanBePromise<T>;
    /** Error in synchrone call */
    private syncException: any;

    public get isPromise() {
        return isPromise(this.returnValue);
    }

    public static new<T>(func: () => CanBePromise<T>): MaybePromise<T> {
        return new MaybePromise(func);
    }

    private constructor(func: () => CanBePromise<T>, previousMaybePromise?: MaybePromise<any>) {
        try {
            if (previousMaybePromise == null || previousMaybePromise.syncException == null) {
                // Run func only if the previous call dont throw exception
                this.returnValue = func();
            }
            
            if (previousMaybePromise?.syncException != null) {
                this.syncException = previousMaybePromise?.syncException;
            }
        }
        catch (except: any) {
            this.syncException = except;
        }
    }

    public then<TResult>(onfulfilled: (value: T) => CanBePromise<TResult>): MaybePromise<TResult> {
        if (this.isPromise) {
            // Promise => Next must be promise
            return new MaybePromise(() => (this.returnValue as Promise<T>).then(onfulfilled), this);
        }
        else {
            return new MaybePromise(() => onfulfilled(this.returnValue as T), this);
        }
    }

    public catch(onrejected: (except: any) => void): MaybePromise<T> {
        if (isPromise(this.returnValue)) {
            const returnValue = this.returnValue;
            return new MaybePromise<T>(() => returnValue.catch(onrejected) as Promise<T>, this);
        }
        else if (this.syncException != null) {
            onrejected(this.syncException);
            return this;
        }

        return this;
    }

    public done(): CanBePromise<T> {
        return this.returnValue;
    }
}
