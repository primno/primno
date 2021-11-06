import { DomainBase } from "../domain";
import { Scope } from "../typing";

export enum DecoratorTypes {
    Domain = "Domain"
}

/**
 * Domain decorator. Indicates the scope of usage.
 * The domain describes a set of functionalities and their context of use.
 * @param entityName
 * @param formName
 */
export function MnDomain<T extends { new (...args: unknown[]): DomainBase}>(scope: Scope) {
    return function (constructor: T): void {
        Reflect.set(constructor, DecoratorTypes.Domain, true);
        Reflect.set(constructor, "scope", scope);
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