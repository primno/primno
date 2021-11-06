import { EnableRuleBase } from "../components";
import { Component, ComponentConfig } from "../typing";

/**
 * Fluent API used to initialize a domain.
 * Adds features and activation rules.
 */
export class FluentDomainInitializer {
    private _components: Component[] = [];

    public get components(): Component[] {
        return this._components;
    }
    
    /**
     * Adds a new component with its events.
     * @param component
     */
    public newComponent(component: Component): FluentDomainInitializer {
        this.components.push(component);
        return this;
    }

    /**
     * Adds a new component from his type and his configuration.
     * Added component must have a constructor with one parameter: config
     * @param componentType
     * @param config 
     * @returns 
     */
    public newComponentTypeWithConfig<TConfig extends ComponentConfig>(
        componentType: { new(config: TConfig): Component<TConfig> }, config: TConfig
        ): FluentDomainInitializer {
        this.components.push(new componentType(config));
        return this;
    }

    /**
     * Adds a new component from his type.
     * Added component must have a default constructor (none paramter)
     * @param componentType 
     * @returns 
     */
    public newComponentType<TConfig extends ComponentConfig>(
        componentType: { new(): Component<TConfig> }
        ): FluentDomainInitializer {
        this.components.push(new componentType());
        return this;
    }

    /**
     * Adds a new enable rule component.
     * @param enableRule
     */
    public newEnableRule(enableRule: EnableRuleBase): FluentDomainInitializer {
        this._components.push(enableRule);
        return this;
    }
}