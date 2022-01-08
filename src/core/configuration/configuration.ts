export type ModuleResolverTypes = "import";

export interface ModuleResolverConfig {
    type: ModuleResolverTypes;
    uriTemplate: string;
}

/** Framework configuration */
export interface Configuration {
    moduleResolverConfig: ModuleResolverConfig;
}