import { Inject } from "../di/inject";

/**
 * Decorator that mark a property as input.
 * @returns 
 */
 export function MnInput() {
    return Inject("input");
}