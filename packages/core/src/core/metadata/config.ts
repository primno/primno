import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { Component, ConfigOrConfigMapper } from "../../typing";
import { Inject } from "../di";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

/**
 * Decorator that mark the property as component config.
 * 
 * The configuration is a set of values specific to the component that can be totally or partially obtained from the component input.
 * The main advantage of the configuration is that its values
 * can be used by decorators such as the {@link MnSubComponent} decorator or event decorators. For example {@link MnOnColumnChange}.
 * 
 * The associated property must be named `config`. An other property name is not supported.
 * The `config` property must define the type of the configuration and the value of the configuration must be set by the decorator parameter.
 * 
 * The `Config` interface contains the property name constraint.
 * It is recommended to inherit from it when you need to define a config in your component.
 * 
 * @example Define a simple config (title and description) and fill it with the values "My title" and "My description".
 * ```ts
 * @MnComponent({
 *   scope: {
 *    pageType: PageType.record
 *  }
 * })
 * export class MyComponent implements Config {
 *    @MnConfig({
 *       title: "My title",
 *       description: "My description"
 *    })
 *    config: {
 *       title: string;
 *       description: string;
 *    };
 * }
 * ```
 * 
 * @example Define a component getting partially its configuration from its input.
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: PageType.record
 *    }
 * })
 * export class MyComponent implements Input, Config {
 *    @MnInput()
 *    input: {
 *       title: string;
 *    };
 * 
 *    @MnConfig<MyComponent>((input) => ({
 *       title: input.title, // The title is obtained from the input
 *       description: "My description" // The description is a constant
 *    }))
 *    config: {
 *       title: string;
 *       description: string;
 *    };
 * }
 * ```
 * 
 * @category Component
 * @returns 
 */
 export function MnConfig<TComp extends Component = Component>(config: ConfigOrConfigMapper<TComp>) {
    // TODO: Make decorator helper
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {
        Inject("config")(target, targetKey, indexOrPropertyDescriptor);

        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("config", config);
    }
}