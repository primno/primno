import { notifyCriticalError } from "./error";

// TODO: Use @rollup/plugin-strip to remove debug and assert in production

/**
 * Show a debug message
 * @param message Message
 */
export function debug(message: any): void {
    console.debug(message);
}

/**
 * Show a verbose message
 * @param message Message
 */
export function verbose(message: string) {
    console.log(message);
}

export function assert(assertion: boolean, message?: string): void {
    if (assertion !== true){
        notifyCriticalError(`Assertion failed: ${message}`);
    }
}

/**
 * Show an error message
 * @param message Message
 */
export function throwError(message: string) {
    console.error(message);
    throw new Error(message);
}
