/* eslint-disable @typescript-eslint/ban-types */
// https://github.com/rbuckton/reflect-metadata

export function setMetadata<T>(key: string, value: T, target: Object) {
    Reflect.defineMetadata(Symbol.for(key), value, target);
}

export function getMetadata<T>(key: string, target: Object): T {
    return Reflect.getMetadata(Symbol.for(key), target);
}

export function hasMetadata(key: string, target: Object): boolean {
    return Reflect.hasMetadata(Symbol.for(key), target);
}