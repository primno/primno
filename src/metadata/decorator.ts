import { DomainBase } from "../domain";
import { Scope } from "../typing";
import { setMetadata } from "../utils/metadata";

export enum DecoratorTypes {
    Domain = "Domain"
}

export interface DomainMetadata {
    scope: Scope;
}

/**
 * Domain decorator. Indicates the scope of usage.
 * The domain describes a set of functionalities and their context of use.
 * @param scope
 */
export function MnDomain<T extends { new (...args: unknown[]): DomainBase}>(scope: Scope) {
    return function (constructor: T): void {
        setMetadata<DomainMetadata>(DecoratorTypes.Domain, { scope }, constructor);
    };
}

// export function MnConfig() {
//     return function(constructor: Function): void {
//         constructor.prototype.mnConfig = true;
//     };
// }

// export function MnEnableRule() {
//     return function(constructor: Function) {
//         constructor.prototype.mnEnableRule = true;
//     }
// }

// export function MnPopulateMenu() {
//     return function(constructor: Function) {
//         constructor.prototype.mnEnableRule = true;
//     }
// }