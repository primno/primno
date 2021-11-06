import { notifyCriticalError } from "./error";

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
