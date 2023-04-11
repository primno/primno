import { ComponentOrComponentConstructor, Event } from "../../typing";
import { EventConfig, SubComponentConfig } from "../metadata";
import { MetadataKeys } from "../metadata/key";
import { PropertyMetadata } from "../reflection/property";

/**
 * Describe an event in a component.
 */
export interface EventMetadata extends Event {
    /**
     * Property name in the component.
     */
    keyName: string;
}

/**
 * ComponentBrowser allows to navigate in the component tree.
 * It resolves the input, config et event value.
 * @internal
 */
export class ComponentBrowser {
    private _config: any | undefined;
    private _input: any | undefined;
    private _keyName: string | undefined;
    private _defaultEnabled: boolean | undefined;
    private _componentType: ComponentOrComponentConstructor;
    private _hasStaticConfig = true;
    private _hasInput = false;

    public constructor(componentType: ComponentOrComponentConstructor, input?: any) {
        this._componentType = componentType;
        this._input = input;
        this._config = this.resolveConfig(input);
    }

    private resolveConfig(input: any | undefined): any | undefined {
        const propMetadata = new PropertyMetadata(this.componentType, "config");
        const configOrMapper = propMetadata.getMetadata(MetadataKeys.config);

        switch (typeof configOrMapper) {
            case "function":
                this._hasStaticConfig = false;
                return configOrMapper(input);
            case "object":
                return configOrMapper;
            case "undefined":
                return undefined;
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
                    throw new Error(`Unable to resolve event target name. Config missing for ${this.componentType.name}`);
                }
            }
            default:
                return valueOrValueMapper;
        }
    }

    private resolveSubComponentInput(input: any) {
        switch (typeof input) {
            case "function": {
                if (this.config != null) {
                    return input(this.config);
                }
                else {
                    throw new Error(`Unable to resolve sub-component input. Config missing for ${this.componentType.name}`);
                }
            }
            case "object": return input;
            case "undefined": return undefined;
            default: throw new Error("Unsupported input type");
        }
    }
    
    /** Input value of the component */
    public get input(): any | undefined {
        return this._input;
    }

    /**
     * Indicates if the component has an input.
     */
    public get hasInput(): boolean {
        // TODO: Check if the input is set
        throw new Error("Not implemented.");
    }

    /** Config value of the component */
    public get config(): any | undefined {
        return this._config;
    }

    /** Indicates if the config is static or resolved from the input */
    public get hasStaticConfig(): boolean {
        return this._hasStaticConfig;
    }

    /** Name of the component type (Eg: AppComponent) */
    public get name() {
        return this.componentType.name ?? this.componentType.constructor.name;
    }

    /** Constructor of the component or an instance of the component */
    public get componentType() {
        return this._componentType;
    }

    /** Gets the property name of this sub-component.
     * Only available if this component is a sub-component in the component tree */
    public get keyName(): string | undefined {
        return this._keyName;
    }

    /** Gets the default state of this sub-component.
     * Only available if this component is a sub-component in the component tree */
    public get defaultEnabled(): boolean | undefined {
        return this._defaultEnabled;
    }

    /** Gets sub components of this component */
    public get subComponents(): ComponentBrowser[] {
        return PropertyMetadata.getPropertiesMetadata(this.componentType)
            .filter(p => p.hasMetadata(MetadataKeys.subComponent))
            .map(p => {
                const cfg = p.getMetadata<SubComponentConfig>(MetadataKeys.subComponent);
                const subComp = new ComponentBrowser(
                    cfg.component,
                    this.resolveSubComponentInput((cfg as any).input)
                );
                subComp._keyName = p.propertyKey;
                subComp._defaultEnabled = cfg.enabled ?? true;
                return subComp;
            } );
    }

    /** Gets events of this component */
    public get events(): EventMetadata[] {
        return PropertyMetadata.getPropertiesMetadata(this.componentType)
            .filter(p => p.hasMetadata(MetadataKeys.events))
            .flatMap(p => {
                const events = p.getMetadata<EventConfig[]>(MetadataKeys.events);
                return events.map(e => ({
                    type: e.type,
                    targetName: this.resolveEventTargetName(e.target),
                    keyName: p.propertyKey
                }));
            });
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