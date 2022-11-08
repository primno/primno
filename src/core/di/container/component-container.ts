import { ComponentConstructor } from "../../../typing/component";
import { ModuleConstructor } from "../../../typing/module";
import { throwError } from "../../../utils";
import { ComponentConfigInternal } from "../../metadata/component";
import { getModuleConfig, getComponentConfig, isModule } from "../../metadata/helper";
import { Container, Middleware } from "./container";

/**
 * Create the root module container.
 */
export class RootContainer {
    private _container: Container;

    //private _rootComponentContainer!: ComponentContainer;

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

        //this._rootComponentContainer = new ComponentContainer(bootstrap, this._container);
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

    // public get componentContainer(): ComponentContainer  {
    //     return this._rootComponentContainer;
    // }
}

/**
 * Create a component container.
 */
export class ComponentContainer<T extends ComponentConstructor = ComponentConstructor> {
    protected _container: Container;

    public get container() {
        return this._container;
    }

    public constructor(private component: T, parentContainer?: Container) {
        if (parentContainer) {
            this._container = parentContainer.createChild();
        }
        else {
            this._container = new Container();
        }

        this.bindComponent(component);
    }

    public bindInput(input: any) {
        this.container.bindConstantValue("input", input);
    }

    public bindConfig(config: any) {
        this.container.bindConstantValue("config", config);
    }

    protected bindComponent(componentType: ComponentConstructor) {
        const config = getComponentConfig(componentType) as ComponentConfigInternal;

        if (!config.moduleConfig) {
            throwError(`The component ${componentType.name} is not declared in a module`);
        }

        // Bind sub components of current module
        config.moduleConfig?.declarations
            ?.filter(c => c !== componentType) // Except itself
            .forEach(c => this._container.bindComponent(c));
        
        // Bind sub components of imported modules
        config.moduleConfig?.imports
            ?.flatMap(m => getModuleConfig(m)?.exports)
            .filter(c => c)
            .forEach(c => this._container.bindComponent(c!));

        // Bind services declared in component
        config.providers?.forEach(s => this._container.bindService(s.provide, s.useClass));
    }

    /**
     * Obtains instance of component from this container.
     * @returns 
     */
    public get(): InstanceType<T> {
        return this._container.get(this.component) as InstanceType<T>;
    }
}
