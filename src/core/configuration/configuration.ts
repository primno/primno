export type ModuleResolverTypes = "import";

export interface ModuleResolverConfig {
    type: ModuleResolverTypes;
    format: string;
}

/** Framework configuration */
export interface Configuration {
    moduleResolverConfig: ModuleResolverConfig;
}