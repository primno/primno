import { ComponentConstructor, Component, Scope } from "../../typing";
import { debug, verbose } from "../../utils";
import { isInScope } from "../../utils/scope";
import { ComponentContainer } from "../di/container/component-container";
import { Container } from "../di/container/container";
import { getComponentConfig } from "../metadata/helper";
import { ComponentBrowser } from "./component-browser";
import { ComponentLifeCycle } from "./component-lifecycle";

/**
 * Represents a sub-component that can be enabled or disabled.
 * Must be used in conjunction with the {@link @MnSubComponent} decorator.
 * @category Component
 * @typeparam T Component type
 */
export interface SubComponent<T extends Component> {
    readonly enabled: boolean;
    enable(): void;
    disable(): void;

    //readonly output: OutputOf<T> | undefined;
}

/**
 * @internal
 */
export class ComponentActivator<T extends Component> implements SubComponent<T> {
    public constructor(
        private componentType: ComponentConstructor,
        private componentLifeCycle: ComponentLifeCycle,
        parentContainer: Container,
        contextScope: Scope,
        input?: any
     ) {
        this.componentBrowser = new ComponentBrowser(componentType, input);

        const componentMetada = getComponentConfig(this.componentType);
        const componentScope = componentMetada?.scope;
        this.inScope = isInScope(contextScope, componentScope as Scope);

        this.container = new ComponentContainer(componentType, parentContainer);
        this.container.bindInput(input);
        this.container.bindConfig(this.componentBrowser.config);
    }

    private container: ComponentContainer<ComponentConstructor<T>>;
    private componentBrowser: ComponentBrowser;

    /*public get output(): OutputOf<T> | undefined {
        return undefined as any;
    }*/

    private inScope: boolean;

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

        if (!this.inScope) {
            debug(`The component ${this.componentType.name} is not in the scope of the context and will not be enable`);
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