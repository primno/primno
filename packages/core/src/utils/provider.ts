import { Bind } from "../core/di/container/bind";
import { ProviderConfig } from "../core/metadata/provider";

/**
 * Get bind from provider configuration.
 * @param providerConfig 
 * @returns 
 */
export function getBindFromProvider(providerConfig: ProviderConfig): Bind {
    if ("provide" in providerConfig) {
        if ("useFactory" in providerConfig) {
            return {
                type: "factory",
                token: providerConfig.provide,
                use: providerConfig.useFactory
            };
        }

        if ("useClass" in providerConfig) {
            return {
                type: "class",
                token: providerConfig.provide,
                use: providerConfig.useClass
            };
        }

        if ("useValue" in providerConfig) {
            return {
                type: "value",
                token: providerConfig.provide,
                use: providerConfig.useValue
            };
        }

        throw new Error("Invalid provider");
    }
    
    return {
        type: "class",
        token: providerConfig,
        use: providerConfig
    };
}