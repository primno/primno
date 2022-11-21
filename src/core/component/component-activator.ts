import { ComponentConstructor, Component } from "../../typing";
import { debug, verbose } from "../../utils";
import { ComponentContainer } from "../di/container/component-container";
import { Container } from "../di/container/container";
import { ComponentBrowser } from "./component-browser";
import { ComponentLifeCycle } from "./component-lifecycle";

export interface SubComponent<T extends Component> {
    readonly enabled: boolean;
    enable(): void;
    disable(): void;

    //readonly output: OutputOf<T> | undefined;
}

export class ComponentActivator<T extends Component> implements SubComponent<T> {
    public constructor(
        private componentType: ComponentConstructor,
        private componentLifeCycle: ComponentLifeCycle,
        parentContainer: Container,
        input?: any
     ) {
        this.componentBrowser = new ComponentBrowser(componentType, input);

        this.container = new ComponentContainer(componentType, parentContainer);
        this.container.bindInput(input);
        this.container.bindConfig(this.componentBrowser.config);
    }

    private container: ComponentContainer<ComponentConstructor<T>>;
    private componentBrowser: ComponentBrowser;

    /*public get output(): OutputOf<T> | undefined {
        return undefined as any;
    }*/

    private component?: T;

    /** State of the component. true if enabled */
    public get enabled(): boolean {
        return this.component != null;
    }

    /**
     * Create an instance of the component.
     * @returns 
     */
    public enable(): void {
        if (this.enabled) {
            verbose(`Component ${this.componentType.name} already enabled`);
            return;
        }

        debug(`Enable component ${this.componentType.name}`);

        this.component = this.container?.get();
        if (!this.component) {
            throw new Error(`Unable to find ${this.componentType.name}.`);
        }
    }

    /**
     * Destroy instance of the component.
     * @returns 
     */
    public disable(): void {
        if (!this.enabled) {
            verbose(`Component ${this.componentType.name} already disabled`);
            return;
        }

        debug(`Disable component ${this.componentType.name}`);
        
        this.componentLifeCycle.destroy(this.component as Component);

        this.component = undefined;
    }
}