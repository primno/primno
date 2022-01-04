import { ModuleResolverConfig } from "../configuration";
import { isNullOrUndefined } from "../../utils";
import { ModuleResolver } from "./module-resolver";
import { Module } from "../../typing";

export class ImportModuleResolver implements ModuleResolver {
    /**
     * 
     * @param config Gets the webressource url from the configuration data. 
     * @param formCtx 
     */
    private getWebResourceUri(config: ModuleResolverConfig, entityName: string): string{
        const baseUrl = Xrm.Utility.getGlobalContext().getClientUrl();

        // TODO: Sécuriser
        let uri = config.format.replace("{webResourceBaseUrl}", `${baseUrl}/WebResources/`);
        uri = config.format.replace("{entityName}", entityName);
        
        return uri;
    }

    public async resolve(config: ModuleResolverConfig, entityName: string): Promise<Module> {
        const webResourceUri = this.getWebResourceUri(config, entityName);
        
        try {
            const esm = await import(webResourceUri);

            if (isNullOrUndefined(esm)) {
                throw new Error(`Unable to import from ${webResourceUri} uri.`);
            }

            return esm;
        } catch (except) {
            throw new Error(`Web resource ${webResourceUri} can't be loaded.`);
        }
    }
}