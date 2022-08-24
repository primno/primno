import { EsmResolver, ImportModuleResolver } from ".";
import { InitializeOptions } from "../primno";
import { EmbeddedEsmResolver } from "./embedded-esm-resolver";

/** Builds and gets the module resolver from its type */
export function buildEsmResolver(primnoInit: InitializeOptions): EsmResolver {
    const moduleConfig = primnoInit.config.moduleResolverConfig;

    switch (moduleConfig.type) {
        case "import":
            return new ImportModuleResolver(moduleConfig);
        case "embedded":
            return new EmbeddedEsmResolver(primnoInit.esm);
        default: throw new Error("Unable to find module resolver");
    }
}