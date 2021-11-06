export type ModuleResolverTypes = "import";

export interface ModuleResolverConfig {
    type: ModuleResolverTypes;
}

/** Framework configuration */
export interface Configuration {
    moduleResolverConfig: ModuleResolverConfig;
}