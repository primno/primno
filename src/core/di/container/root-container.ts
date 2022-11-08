import { ComponentConstructor } from "../../../typing/component";
import { ModuleConstructor } from "../../../typing/module";
import { getModuleConfig, isModule } from "../../metadata/helper";
import { Container, Middleware } from "./container";

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

        const config = getModuleConfig(moduleType);
        const bootstrap = config?.bootstrap as ComponentConstructor;

        this._container = new Container();
        this.bindModule(moduleType);
        this.applyMiddlewares();

        this._container.bindComponent(bootstrap);
    }

    /**
     * Middlewares will be executed left to right.
     * @param middlewares Middlewares
     */
    public applyMiddlewares(...middlewares: Middleware[]) {
        this._container.addMiddlewares(...middlewares);
    }

    private bindModule(moduleType: ModuleConstructor) {
        const config = getModuleConfig(moduleType);

        config?.providers?.forEach(p => this._container.bindService(p.provide, p.useClass));
        config?.imports?.forEach(m => this.bindModule(m));
    }
}