import { injectable } from "inversify";

/**
 * Decorator that marks a class providable as a depencency.
 * @returns 
 */
export function Injectable() {
    return injectable();
}