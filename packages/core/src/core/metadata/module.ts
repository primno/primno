import { decorate } from "inversify";
import { ComponentConstructor, ModuleConstructor } from "../../typing";
import { Injectable } from "../di/injectable";
import { ClassMetadata } from "../reflection/class";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";
import { Provider } from "./provider";

/**
 * Module decorator configuration
 * @category Module
 */
 export interface ModuleConfig extends Provider {
    /**
     * Imported modules. Exported components by imported modules will be usable by components of this module.
     */
    imports?: ModuleConstructor[];

    /**
     * Components usables by others components in with module.
     */
    declarations?: ComponentConstructor[];
    
    /**
     * Components usables by any modules that import this module.
     */
    exports?: ComponentConstructor[];

    /**
     * Bootstrap component(s).
     */
    bootstrap?: ComponentConstructor | ComponentConstructor[];
}

/**
 * Decorator that mark a class as module.
 * @param moduleConfig Configuration of the module.
 */
export function MnModule<T>(moduleConfig: ModuleConfig) {
    return function (target: { new(...args: any[]): T }) {
        decorate(Injectable(), target);

        const metadataDecorator = new MetadataDecoratorHelper(target);
        const previousMetadata = metadataDecorator.getMetadata("module") ?? {};
        metadataDecorator.setMetadata("module", { ...previousMetadata, ...moduleConfig });

        // Set moduleConfig to all components
        moduleConfig.declarations?.forEach(c => {
            const componentMetadata = new ClassMetadata(c);
            const metadata = componentMetadata.getMetadata("component");
            if (!metadata) {
                throw new Error(`Declared component ${c} is not a component`);
            }
            metadata.moduleConfig = moduleConfig;
            componentMetadata.setMetadata("component", metadata);
        });
    }
}