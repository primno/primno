import { Esm, ModuleConstructor } from "../../typing";
import { debug } from "../../utils";
import { isModule } from "../metadata/helper";
import { InitializeOptions } from "../primno";
import { EsmResolver } from "./esm-resolver";
import { buildEsmResolver } from "./esm-resolver-factory";

export class EsmBrowser {
    public constructor(private esm: Esm) {
        
    }

    public get module() : ModuleConstructor {
        const keys = Object.keys(this.esm);

        if (keys.length !== 1) {
            throw new Error("Invalid ESM: An entry point must export one module");
        }

        const module = this.esm[keys[0]];
        
        if (!isModule(module)) {
            throw new Error("Invalid ESM: Module not found");
        }

        return module;
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
