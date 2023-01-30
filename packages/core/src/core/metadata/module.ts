import { decorate } from "inversify";
import { ComponentConstructor, ModuleConstructor } from "../../typing";
import { Injectable } from "../di/injectable";
import { ClassMetadata } from "../reflection/class";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";
import { Provider } from "./provider";

/**
 * Module configuration of {@link MnModule}.
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
 * 
 * A module is a container of components. It define the components and depencencies that be usable by its own components.
 * 
 * @remarks
 * A component must be declared in a module with the `declarations` property to be usable and only one module can associate to a component.
 * 
 * @example A boostrap module nammed `AppModule` that will run `AppComponent` on startup, make `AccountComponent` usable by `AppComponent`.
 * Provide `AccountService` to `AccountComponent` and `AppComponent`.
 * ```ts
 * @MnModule({
 *    bootstrap: AppComponent,
 *    declarations: [AccountComponent],
 *    providers: [AccountService]
 * })
 * export class AppModule {}
 * ```
 * @example A `AppModule` module that import the submodule `CommonModule` and make its exported components available to the `ContactComponent`.
 * `GridComponent` is not exported by `CommonModule` so it is not available to `ContactComponent`.
 * ```ts
 * @MnModule({
 *    exports: [FormComponent],
 *    declarations: [FormComponent, GridComponent],
 * })
 * export class CommonModule {}
 * 
 * @MnModule({
 *   imports: [CommonModule],
 *   declarations: [ContactComponent],
 * })
 * export class AppModule {}
 * ```
 * @category Module
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