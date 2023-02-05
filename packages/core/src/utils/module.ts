import { getAllImportedModuleConfig, getModuleConfig } from "../core/metadata/helper";
import { ComponentConstructor, ModuleConstructor } from "../typing";

/**
 * Gets the bootstrap components from a module.
 * @param module Module
 */
export function getBootstrapComponents(module: ModuleConstructor) {
    const moduleConfigs = getAllImportedModuleConfig(module);

    const bootstraps: ComponentConstructor[] = moduleConfigs
        .flatMap(m => m.bootstrap)
        .filter(c => c != null) as ComponentConstructor[];

    if (bootstraps.length === 0) {
        throw new Error("Bootstap component(s) not found in module");
    }

    return bootstraps;
}