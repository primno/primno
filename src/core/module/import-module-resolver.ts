import { ImportModuleResolverConfig } from "../configuration";
import { isNullOrUndefined } from "../../utils";
import { ModuleResolver } from "./module-resolver";
import { Module } from "../../typing";

export class ImportModuleResolver implements ModuleResolver {
    constructor(private config: ImportModuleResolverConfig) {}

    public async resolve(): Promise<Module> {
        try {
            const esm = await import(this.config.uri);

            if (isNullOrUndefined(esm)) {
                throw new Error(`Unable to import module from ${this.config.uri} uri.`);
            }

            return esm;
        } catch (except) {
            throw new Error(`Web resource ${this.config.uri} can't be loaded.`);
        }
    }
}