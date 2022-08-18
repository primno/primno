export type ModuleResolverTypes = "import" | "embedded";

export interface ImportModuleResolverConfig {
    type: "import",
    uri: string;
}

export interface EmbeddedModuleResolverConfig {
    type: "embedded"
}

export type ModuleResolverConfig = ImportModuleResolverConfig | EmbeddedModuleResolverConfig;

/** Framework configuration */
export interface Configuration {
    moduleResolverConfig: ModuleResolverConfig;
}