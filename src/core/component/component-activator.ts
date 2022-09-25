import { ComponentConstructor, ComponentObject, InputOf } from "../../typing";
import { debug } from "../../utils";
import { ComponentContainer } from "../di/container/component-container";
import { Injectable } from "../di/injectable";

export type ComponentActivatorFactory = <T extends ComponentObject>(component: new (...args: any[]) => T) => ComponentActivator<T>;

@Injectable()
export class ComponentActivator<T extends ComponentObject> {
    public constructor(
        private componentType: ComponentConstructor,
        initialState = true
        ) {
        this.state = initialState;
    }

    private container?: ComponentContainer;

    public get input(): InputOf<T> | undefined {
        return this.component?.input;
    }

    /*public get output(): OutputOf<T> | undefined {
        return undefined as any;
    }*/

    private _state = false;

    public component?: T;

    public get state(): boolean {
        return this._state;
    }

    private set state(value: boolean) {
        this._state = value;
    }

    public enable(): void {
        debug(`Enable component ${this.componentType.name}`);

        this.component = this.container?.get(this.componentType) as T;
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

    public init(container: ComponentContainer) {
        this.container = container;

        if (this.state) {
            this.enable();
        }
    }
}