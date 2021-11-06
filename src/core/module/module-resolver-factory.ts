import { ModuleResolver, ImportModuleResolver } from ".";
import { ModuleResolverTypes } from "../configuration";

/** Builds and gets the module resolver from its type */
export function buildModuleResolver(type: ModuleResolverTypes): ModuleResolver {
    switch(type){
        case "import": return new ImportModuleResolver();
        default: throw new Error("Resolver type unsupported");
    }
}