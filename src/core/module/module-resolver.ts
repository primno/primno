import Module from "module";

/**
 * Used to obtain the js module.
 * The module contains the domains.
 */
export interface ModuleResolver {
    resolve(): Promise<Module>;
}
