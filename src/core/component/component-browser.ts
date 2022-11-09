import { ComponentOrComponentConstructor } from "../../typing";
import { Event } from "../events/event-storage";
import { EventConfig, SubComponentConfig } from "../metadata";
import { PropertyMetadata } from "../reflection/property";

/**
 * ComponentBrowser allows to navigate in the component tree.
 * It resolves the input, config et event value.
 */
export class ComponentBrowser {
    private _config: any | undefined;
    private _input: any | undefined;
    private _keyName: string | undefined;
    private _defaultEnabled: boolean | undefined;
    private _componentType: ComponentOrComponentConstructor;

    public constructor(componentType: ComponentOrComponentConstructor, input?: any) {
        this._componentType = componentType;
        this._input = input;
        this._config = this.resolveConfig(input);
    }

    private resolveConfig(input: any | undefined): any | undefined {
        const propMetadata = new PropertyMetadata(this.componentType, "config");
        const configOrMapper = propMetadata.getMetadata("config");

        switch (typeof configOrMapper) {
            case "function": return configOrMapper(this.input);
            case "object": return configOrMapper;
            default: throw new Error(`Invalid component config type: ${typeof configOrMapper}`);
        }
    }

    private resolveEventTargetName(valueOrValueMapper: unknown) {
        switch (typeof valueOrValueMapper) {
            case "function": {
                if (this.config) {
                    return valueOrValueMapper(this.config);
                }
                else {
                    throw new Error("Config required");
                }
            }
            default:
                return valueOrValueMapper;
        }
    }

    private resolveSubComponentInput(input: any) {
        switch (typeof input) {
            case "function": {
                if (this.config) {
                    return input(this.config);
                }
                else {
                    throw new Error(`Config required in ${this.componentType.constructor.name}`);
                }
            }
            case "object": return input;
            case "undefined": return undefined;
            default: throw new Error("Unsupported input type");
        }
    }
    
    public get input(): any | undefined {
        return this._input;
    }

    public get config(): any | undefined {
        return this._config;
    }

    public get name() {
        return this.componentType.name ?? this.componentType.constructor.name;
    }

    public get componentType() {
        return this._componentType;
    }

    /** Gets the property name of this subcomponent.
     * Only available if this component is a subcomponent in the component tree */
    public get keyName(): string | undefined {
        return this._keyName;
    }

    /** Gets the default state of this subcomponent.
     * Only available if this component is a subcomponent in the component tree */
    public get defaultEnabled(): boolean | undefined {
        return this._defaultEnabled;
    }

    /** Gets sub components of this component */
    public get subComponents(): ComponentBrowser[] {
        return PropertyMetadata.getPropertiesMetadata(this.componentType)
            .filter(p => p.hasMetadata("subcomponent"))
            .map(p => {
                const cfg = p.getMetadata<SubComponentConfig>("subcomponent");
                const subComp = new ComponentBrowser(cfg.component, this.resolveSubComponentInput(cfg.input));
                subComp._keyName = p.propertyKey;
                subComp._defaultEnabled = cfg.enabled;
                return subComp;
            } );
    }

    /** Gets events of this component */
    public get events(): Event[] {
        return PropertyMetadata.getPropertiesMetadata(this.componentType)
            .filter(p => p.hasMetadata("event"))
            .map(p => p.getMetadata<EventConfig>("event"))
            .map(e => ({
                    type: e.type,
                    targetName: this.resolveEventTargetName(e.target),
                })
        );
    }

    /**
     * Gets events of all sub components recursively.
     */
    public get allEvents(): Event[] {
        return this.subComponents
            .flatMap(c => c.allEvents)
            .concat(this.events);
    }
}