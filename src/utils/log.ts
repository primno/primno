import { notifyCriticalError } from "./error";

// TODO: Use @rollup/plugin-strip to remove debug, verbose and assert in production

/**
 * Log a debug message
 * @param message Message
 */
export function debug(message: any): void {
    console.debug(message);
}

/**
 * Log a verbose message
 * @param message Message
 */
export function verbose(message: string) {
    console.log(`[VERBOSE] ${message}`);
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
