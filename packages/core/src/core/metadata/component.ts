import { decorate } from "inversify";
import { Constructor, Scope } from "../../typing";
import { Injectable } from "../di/injectable";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";
import { ModuleConfig } from "./module";
import { Provider } from "./provider";

export interface ComponentConfig extends Provider {
    scope: Scope;
}

export interface ComponentConfigInternal extends ComponentConfig {
    /**
     * Module configuration. Internal use only.
     * Provided by MnModule from declarations.
     */
    moduleConfig?: ModuleConfig;
}

export function MnComponent<T extends Constructor>(config: ComponentConfig) {
    return function (target: T) {
        decorate(Injectable(), target);

        const decoratorTarget = new MetadataDecoratorHelper(target);
        decoratorTarget.setMetadata("component", config);
    }
}