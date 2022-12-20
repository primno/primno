import { Bind } from "../core/di/container/bind";
import { ProviderConfig } from "../core/metadata/provider";

export function getBindFromProvider(providerConfig: ProviderConfig): Bind {
    if (providerConfig.provide != null) {
        if (providerConfig.useFactory != null) {
            return {
                type: "factory",
                token: providerConfig.provide,
                use: providerConfig.useFactory
            };
        }

        if (providerConfig.useClass != null) {
            return {
                type: "class",
                token: providerConfig.provide,
                use: providerConfig.useClass
            };
        }

        if (providerConfig.useValue != null) {
            return {
                type: "value",
                token: providerConfig.provide,
                use: providerConfig.useClass
            };
        }

        throw new Error("Invalid provider");
    }
    else {
        return {
            type: "class",
            token: providerConfig,
            use: providerConfig
        };
    }
}