import { Inject } from "../di/inject";

/**
 * Decorator that mark the property as input.
 * @returns 
 */
 export function MnInput() {
    return Inject("input");
}