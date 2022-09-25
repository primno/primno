import { ComponentConstructor } from "../../../typing/component";
import { ModuleConstructor } from "../../../typing/module";
import { ComponentActivator } from "../../component/component-activator";
import { ComponentConfigInternal } from "../../metadata/component";
import { getModuleConfig, getComponentConfig, isModule } from "../../metadata/helper";
import { componentActivatorIdentifier, SubComponentConfig } from "../../metadata/subcomponent";
import { Container, Middleware } from "./container";

export class RootContainer {
    private container: Container;

    private _rootComponentContainer!: ComponentContainer;

    public constructor(moduleType: ModuleConstructor) {
        if (!isModule(moduleType)) {
            throw new Error("moduleType is not a module");
        }

        const config = getModuleConfig(moduleType);
        const bootstrap = config?.bootstrap as ComponentConstructor;

        this.container = new Container();
        this.bindModule(moduleType);
        this.bindComponentActivator();
        this.applyMiddlewares();

        this.container.bindComponent(bootstrap);

        this._rootComponentContainer = new ComponentContainer(bootstrap, this.container);
    }

    public applyMiddlewares(...middlewares: Middleware[]) {
        this.container.addMiddlewares(...middlewares);
    }

    private bindComponentActivator() {
        this.container.bindDynamicValue(componentActivatorIdentifier, (context) => {
            const subComponentConfig = context.currentRequest.target.metadata.find((m: any) => m.key == "subcomponent")?.value as SubComponentConfig;
                return new ComponentActivator(subComponentConfig.componentType, subComponentConfig.enabled);
        });
    }

    private bindModule(moduleType: ModuleConstructor) {
        const config = getModuleConfig(moduleType);

        config?.providers?.forEach(p => this.container.bindService(p.provide, p.useClass));
        config?.imports?.forEach(m => this.bindModule(m));
    }

    public get componentContainer(): ComponentContainer  {
        return this._rootComponentContainer;
    }
}

export class ComponentContainer {
    protected container: Container;

    public constructor(componentType: ComponentConstructor, parentContainer?: Container) {
        if (parentContainer) {
            this.container = parentContainer.createChild();
        }
        else {
            this.container = new Container();
        }

        this.bindComponent(componentType);
    }

    public bindInput(input: any) {
        this.container.bindConstantValue("input", input);
    }

    protected bindComponent(componentType: ComponentConstructor) {
        const config = getComponentConfig(componentType) as ComponentConfigInternal;

        config.moduleConfig?.declarations
            ?.filter(c => c !== componentType) // Except itself
            .forEach(c => this.container.bindComponent(c));
        
        config.moduleConfig?.imports
            ?.flatMap(m => getModuleConfig(m)?.exports)
            .filter(c => c)
            .forEach(c => this.container.bindComponent(c!));

        config.providers?.forEach(s => this.container.bindService(s.provide, s.useClass));
    }

    public get(identifier: any) {
        return this.container.get(identifier);
    }
}
