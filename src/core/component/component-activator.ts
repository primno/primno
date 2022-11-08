import { ComponentConstructor, ComponentObject, ConfigOrConfigMapper } from "../../typing";
import { debug, verbose } from "../../utils";
import { ComponentContainer } from "../di/container/component-container";
import { Container } from "../di/container/container";
import { PropertyMetadata } from "../reflection/property";

export interface SubComponent<T extends ComponentObject> {
    readonly state: boolean;
    enable(): void;
    disable(): void;

    //readonly output: OutputOf<T> | undefined;
}

export class ComponentActivator<T extends ComponentObject> implements SubComponent<T> {
    public constructor(
        private componentType: ComponentConstructor,
        parentContainer: Container,
        private input?: any
     ) {
        this.container = new ComponentContainer(componentType, parentContainer);
        this.container.bindInput(input);
        this.container.bindConfig(this.resolveConfig());
    }

    private resolveConfig() {
        const propMetadata = new PropertyMetadata(this.componentType, "config");
        const configOrMapper = propMetadata.getMetadata<ConfigOrConfigMapper<T>>("config");

        switch (typeof configOrMapper) {
            case "function": return configOrMapper(this.input);
            case "object": return configOrMapper;
            default: throw new Error(`Invalid component config type: ${typeof configOrMapper}`);
        }
    }

    private container: ComponentContainer<ComponentConstructor<T>>;

    /*public get output(): OutputOf<T> | undefined {
        return undefined as any;
    }*/

    private _state = false;

    private component?: T;

    public get state(): boolean {
        return this._state;
    }

    private set state(value: boolean) {
        this._state = value;
    }

    public enable(): void {
        if (this.state) {
            verbose(`Component ${this.componentType.name} already enabled`);
            return;
        }

        debug(`Enable component ${this.componentType.name}`);

        this.component = this.container?.get();
        if (!this.component) {
            throw new Error(`Unable to find ${this.componentType.name}.`);
        }

        this.state = true;
    }

    public disable(): void {
        debug(`Disable component ${this.componentType.name}`);

        this.state = false;
        this.component = undefined;
    }
}