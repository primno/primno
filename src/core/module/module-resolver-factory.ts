import { ModuleResolver, ImportModuleResolver } from ".";
import { InitializeOptions } from "../primno";
import { EmbeddedModuleResolver } from "./embedded-module-resolver";

/** Builds and gets the module resolver from its type */
export function buildModuleResolver(primnoInit: InitializeOptions): ModuleResolver {
    const moduleConfig = primnoInit.config.moduleResolverConfig;

    switch (moduleConfig.type) {
        case "import":
            return new ImportModuleResolver(moduleConfig);
        case "embedded":
            return new EmbeddedModuleResolver(primnoInit.module);
        default: throw new Error("Unable to find module resolver");
    }
}