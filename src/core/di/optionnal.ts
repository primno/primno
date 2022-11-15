import { optional } from "inversify";

/**
 * Decorator that marks an optionnal depencency.
 * null is provide if the dependency is not found.
 * @returns 
 */
export function Optional() {
    return optional();
}