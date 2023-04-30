import { ModuleConstructor } from "../../../typing/module";
import { getBootstrapComponents } from "../../../utils/module";
import { getBindFromProvider } from "../../../utils/provider";
import { getModuleConfig, isModule } from "../../metadata/helper";
import { Container, Middleware } from "./container";
import { getProviders } from "./root-provider";

/**
 * Create the root module container.
 */
 export class RootContainer {
    private _container: Container;

    public get container() {
        return this._container;
    }

    public constructor(moduleType: ModuleConstructor) {
        if (!isModule(moduleType)) {
            throw new Error("moduleType is not a module");
        }

        const components = getBootstrapComponents(moduleType);

        this._container = new Container();
        this.bindModule(moduleType);
        this.applyMiddleware();

        components.forEach(c => this._container.bindComponent(c));
        getProviders().forEach(p => this._container.bindClass(p, p));
    }

    /**
     * Middleware will be executed left to right.
     * @param middleware Middleware
     */
    public applyMiddleware(...middleware: Middleware[]) {
        this._container.addMiddleware(...middleware);
    }

    private bindModule(moduleType: ModuleConstructor) {
        const config = getModuleConfig(moduleType);

        config?.providers
            ?.map(p => getBindFromProvider(p))
            .forEach(p => this._container.bind(p));
        
        config?.imports?.forEach(m => this.bindModule(m));
    }
}