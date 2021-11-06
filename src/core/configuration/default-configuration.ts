import { ImportResolverConfig } from "../module/import-module-resolver";
import { Configuration } from "./configuration";

/** Default configuration */
export class DefaultConfiguration implements Configuration {
    public moduleResolverConfig: ImportResolverConfig = {
        type: "import",
        format: "mn_/js/{entityName}-domain.js"
    };
}