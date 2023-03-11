import { decorate } from "inversify";
import { Constructor, Scope } from "../../typing";
import { Injectable } from "../di/injectable";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";
import { ModuleConfig } from "./module";
import { Provider } from "./provider";

/**
 * Component configuration of {@link MnComponent}.
 * @category Component
 */
export interface ComponentConfig extends Provider {
    scope: Scope;
}

/** @internal */
export interface ComponentConfigInternal extends ComponentConfig {
    /**
     * Module configuration. Internal use only.
     * Provided by MnModule from declarations.
     */
    moduleConfig?: ModuleConfig;
}

/**
 * Decorator that marks a class as a component and provides metadata
 * that indicates where the component must be enabled at runtime.
 * @category Component
 * @typeparam T Component type
 * @param config Component configuration
 * @example Component that runs on all forms of the contact table.
 * ```ts
 * @MnComponent({
 *   scope: {
 *    pageType: "record",
 *    table: "contact"
 *  }
 * })
 * export class ContactRecordComponent { }
 * ```
 * @example Component that runs on a specific form of the account table .
 * ```ts
 * @MnComponent({
 *   scope: {
 *     pageType: "record",
 *     table: "account",
 *     form: {
 *       id: "00000000-0000-0000-0000-000000000000"
 *     }
 *   }
 * })
 * export class AccountFormComponent { }
 * ```
 * @example Component that uses a service as dependency.
 * ```ts
 * @Injectable()
 * export class AccountService { }
 * 
 * @MnComponent({
 *   scope: {
 *     pageType: "record",
 *     table: "account"
 *   },
 *   providers: [{ provide: "accountService", useClass: AccountService }]
 * })
 * export class AccountComponent { }
 * ```
 * For more information, see [dependency injection](/docs/guides/dependency-injection)
 */
export function MnComponent<T extends Constructor>(config: ComponentConfig) {
    return function (target: T) {
        decorate(Injectable(), target);

        const decoratorTarget = new MetadataDecoratorHelper(target);
        decoratorTarget.setMetadata("component", config);
    }
}