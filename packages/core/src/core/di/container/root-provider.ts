import { Constructor } from "../../../typing";
import { GlobalMetadataKeys } from "../../metadata/key";
import { GlobalMetadata } from "../../reflection/global";

const globalMetadata = new GlobalMetadata();

export function addProvider(provider: Constructor) {
    globalMetadata.setMetadata(
        GlobalMetadataKeys.providers,
        [
            ...getProviders(),
            provider
        ]
    );
}

export function getProviders(): Constructor[] {
    return globalMetadata.getMetadata(GlobalMetadataKeys.providers) ?? [];
}