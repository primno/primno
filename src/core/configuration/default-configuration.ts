import { Configuration, ModuleResolverConfig } from "./configuration";

/** Default configuration */
export class DefaultConfiguration implements Configuration {
    public moduleResolverConfig: ModuleResolverConfig = {
        type: "import",
        format: "mn_/js/{entityName}-domain.js"
    };
}