import Module from "module";
import { ModuleResolverConfig } from "../configuration";

/**
 * Used to obtain the js module from a given entity name.
 * The module contains the domains.
 */
export interface ModuleResolver {
    resolve(config: ModuleResolverConfig, entityName: string): Promise<Module>;
}
