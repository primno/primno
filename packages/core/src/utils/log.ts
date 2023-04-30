// TODO: Use @rollup/plugin-strip to remove debug, verbose and assert in production

/**
 * Log a debug message
 * @param message Message
 */
export function debug(message: any): void {
    console.debug(message);
}

/**
 * Log a warning message
 * @param message Message
 */
export function warning(message: string): void {
    console.warn(message);
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
 * Log a error message
 */
export function error(message: string) {
    console.error(message);
}

/**
 * Notifies that a critical error has occurred.
 * @param text Error message.
 */
 export function notifyCriticalError(text: string, details?: string): void {
    error(`Critical error: ${text}. Details: ${details}`);
    Xrm.Navigation.openErrorDialog({ message: text, details: details });
}

/**
 * Show an error message
 * @param message Message
 */
export function throwError(message: string): never {
    console.error(message);
    throw new Error(message);
}
