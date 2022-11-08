import { decorate } from "inversify";
import { Constructor } from "../../typing";
import { Injectable } from "../di/injectable";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";
import { ModuleConfig } from "./module";
import { Provider } from "./provider";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ComponentConfig extends Provider {}

export interface ComponentConfigInternal extends ComponentConfig {
    /**
     * Module configuration. Internal use only.
     * Provided by MnModule from declarations.
     */
    moduleConfig?: ModuleConfig;
}

export function MnComponent<T extends Constructor>(config: ComponentConfig = {}) {
    return function (target: T) {
        decorate(Injectable(), target);

        const decoratorTarget = new MetadataDecoratorHelper(target);
        decoratorTarget.setMetadata("component", config);
    }
}