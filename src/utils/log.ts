import { notifyCriticalError } from "./error";

// TODO: Use @rollup/plugin-strip to remove debug and assert in production

/**
 * Show a debug message
 * @param message Message
 */
export function debug(message: any): void {
    console.debug(message);
}

export function assert(assertion: boolean, message?: string): void {
    if (assertion !== true){
        notifyCriticalError(`Assertion failed: ${message}`);
    }
}
