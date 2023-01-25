import { decorate } from "inversify";
import { Constructor, Scope } from "../../typing";
import { Injectable } from "../di/injectable";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";
import { ModuleConfig } from "./module";
import { Provider } from "./provider";

/**
 * Component configuration of {@link MnComponent}.
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
 * @param config Component configuration
 */
export function MnComponent<T extends Constructor>(config: ComponentConfig) {
    return function (target: T) {
        decorate(Injectable(), target);

        const decoratorTarget = new MetadataDecoratorHelper(target);
        decoratorTarget.setMetadata("component", config);
    }
}