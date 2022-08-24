import { Esm } from "../../typing";
import { debug } from "../../utils";
import { DomainLoader } from "../domain/domain-loader";
import { InitializeOptions } from "../primno";
import { EsmResolver } from "./esm-resolver";
import { buildEsmResolver } from "./esm-resolver-factory";

export class EsmBrowser {
    private _domainRegister: DomainLoader;

    public constructor(private esm: Esm) {
        this._domainRegister = new DomainLoader(this.esm);
    }

    public get domainRegister() : DomainLoader {
        return this._domainRegister;
    }
}

export class EsmLoader {
    private esm?: EsmBrowser;
    private esmResolver: EsmResolver;

    public constructor(primnoInit: InitializeOptions) {
        this.esmResolver = buildEsmResolver(primnoInit);
    }

    public async get(): Promise<EsmBrowser> {
        if (this.esm) {
            return this.esm;
        }

        debug(`Creating EsmBrowser`);
        const module = await this.esmResolver.resolve();
        const esmBrowser = new EsmBrowser(module);
        this.esm = esmBrowser;

        return esmBrowser;
    }
}
