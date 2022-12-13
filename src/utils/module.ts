import { getModuleConfig } from "../core/metadata/helper";
import { ModuleConstructor } from "../typing";

/**
 * Gets the bootstrap components from a module.
 * @param module Module
 */
export function getBootstrapComponents(module: ModuleConstructor) {
    const moduleConfig = getModuleConfig(module);

    if (moduleConfig?.bootstrap == null) {
        throw new Error("Bootstap component(s) not found in module");
    }

    return Array.isArray(moduleConfig.bootstrap) ? moduleConfig.bootstrap : [moduleConfig?.bootstrap];
}