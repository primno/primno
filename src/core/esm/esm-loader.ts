import { Esm, ModuleConstructor } from "../../typing";
import { debug } from "../../utils";
import { InitializeOptions } from "../primno";
import { EsmResolver } from "./esm-resolver";
import { buildEsmResolver } from "./esm-resolver-factory";

export class EsmBrowser {
    public constructor(private esm: Esm) {
        
    }

    public get module() : ModuleConstructor {
        // TODO: IMPORTANT: Replace with default export
        return this.esm["AppModule"];
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
