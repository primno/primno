import { XrmConfigAdapter } from "./adapter/xrm-config-adapter";
import { Configuration } from "./configuration";
// import { DefaultConfiguration } from "./default-configuration";

/**
 * Load Primno configuration.
 * The configuration is obtained in the following order:
 * 1/ Cache.
 * 2/ Js file in dom.
 * 2/ configuration d365 entity
 */
export async function loadConfiguration(): Promise<Configuration> {
    const configAdapter = new XrmConfigAdapter();
    return await configAdapter.getConfig();
}