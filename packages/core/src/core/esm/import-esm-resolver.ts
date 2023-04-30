import { ImportModuleResolverConfig } from "../configuration";
import { EsmResolver } from "./esm-resolver";
import { Esm } from "../../typing/esm";

export class ImportModuleResolver implements EsmResolver {
    constructor(private config: ImportModuleResolverConfig) {}

    public async resolve(): Promise<Esm> {
        try {
            const esm = await import(this.config.uri);

            if (esm == null) {
                throw new Error(`Unable to import module from ${this.config.uri} uri.`);
            }

            return esm;
        } catch (except: any) {
            throw new Error(
                `Web resource ${this.config.uri} can't be loaded. ` +
                `Make sure that the 'mn start' command is running and that you have accept the certificate in your browser.`);
        }
    }
}