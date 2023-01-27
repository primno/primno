import { injectable } from "inversify";

/**
 * Decorator that marks a class providable as a depencency.
 * @category Dependency Injection
 * @returns 
 */
export function Injectable() {
    return injectable();
}