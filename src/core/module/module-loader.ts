import { Module, Scope } from "../../typing";
import { debug, isNullOrUndefined } from "../../utils";
import { ModuleResolverConfig } from "../configuration";
import { DomainLoader } from "../domain/domain-loader";
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
    private modules: Record<string, ModuleBrowser> = {};
    private moduleResolver: ModuleResolver;

    public constructor(private config: ModuleResolverConfig) {
        this.moduleResolver = buildModuleResolver(config.type);
    }

    public async getByScope(scope: Scope): Promise<ModuleBrowser> {
        if (isNullOrUndefined(this.modules[scope.entityName]) == false) {
            return this.modules[scope.entityName];
        }

        debug(`Creating ModuleBrowser for entity ${scope.entityName}`);
        const module = await this.moduleResolver.resolve(this.config, scope.entityName);
        const moduleBrowser = new ModuleBrowser(module);
        this.modules[scope.entityName] = moduleBrowser;

        return moduleBrowser;
    }
}
