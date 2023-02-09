import { ComponentConstructor } from "../../../typing/component";
import { throwError } from "../../../utils";
import { getBindFromProvider } from "../../../utils/provider";
import { ComponentConfigInternal } from "../../metadata/component";
import { getModuleConfig, getComponentConfig } from "../../metadata/helper";
import { Container } from "./container";

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
        config.providers
            ?.map(p => getBindFromProvider(p))
            .forEach(p => this._container.bind(p));
    }

    /**
     * Gets instance of component from this container.
     * @returns 
     */
    public get(): InstanceType<T> {
        return this._container.get(this.component) as InstanceType<T>;
    }
}
