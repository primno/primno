﻿
export const EmptyString = "";

/**
 * Indicates whether the string is null or empty.
 * @param text
 */
export function isNullOrEmpty(text: string | null | undefined): text is null | undefined | "" {
    return isNullOrUndefined(text) || text === EmptyString;
}

export function isNullOrUndefined<T>(obj: T | null | undefined): obj is null | undefined {
    return typeof obj === "undefined" || obj === null;
}

/**
 * Indicates whether an element is a javascript object.
 * @param item
 */
export function isObject(item: unknown): item is Record<string, unknown> {
    return (isNullOrUndefined(item) == false && typeof item === 'object' && !Array.isArray(item));
}

/**
* Merges an object with others, including sub-properties.
* @param target
* @param sources
*/
export function mergeDeep(target: Record<string, unknown>, ...sources: unknown[]): Record<string, unknown> {
    if (!sources.length) return target;

    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, { [key]: {} });
                mergeDeep(<Record<string, unknown>>target[key], source[key]);
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}

/**
 * Determines if an item is a promise. 
 * @param object 
 * @returns 
 */
export function isPromise(object: any): object is PromiseLike<any> {
    return isNullOrUndefined(object?.then) == false;
}

/**
 * Remove {} of a guid
 * @param id
 */
 export function formatId(id: string): string {
    return id.replace(/{|}/g, '');
}

/**
 * Indicates if the 2 Guid are identical.
 * @param id1 Guid 1
 * @param id2 Guid 2
 */
export function isSameId(id1: string, id2: string): boolean {
    return formatId(id1).toLowerCase() == formatId(id2).toLowerCase();
}