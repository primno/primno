import { Module } from "../../typing";
import { debug } from "../../utils";
import { DomainLoader } from "../domain/domain-loader";
import { InitializeOptions } from "../primno";
import { ModuleResolver } from "./module-resolver";
import { buildModuleResolver } from "./module-resolver-factory";

export class ModuleBrowser {
    private _domainRegister: DomainLoader;

    public constructor(private module: Module) {
        this._domainRegister = new DomainLoader(this.module);
    }

    public get domainRegister() : DomainLoader {
        return this._domainRegister;
    }
}

export class ModuleLoader {
    private module?: ModuleBrowser;
    private moduleResolver: ModuleResolver;

    public constructor(primnoInit: InitializeOptions) {
        this.moduleResolver = buildModuleResolver(primnoInit);
    }

    public async get(): Promise<ModuleBrowser> {
        if (this.module) {
            return this.module;
        }

        debug(`Creating ModuleBrowser`);
        const module = await this.moduleResolver.resolve();
        const moduleBrowser = new ModuleBrowser(module);
        this.module = moduleBrowser;

        return moduleBrowser;
    }
}
