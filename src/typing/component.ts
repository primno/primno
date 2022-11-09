import { Constructor, ConstructorOrObject, MnContext } from '.';
import { Config, Input } from '../core/component/interface';
import { ExternalArgs } from './events';

export type ComponentConstructor<T = ComponentObject> = Constructor<T>;
export type ComponentObject = Record<string | number | symbol, any>;
export type ComponentOrComponentConstructor = ConstructorOrObject<ComponentObject>;

/**
 * Obtain input type from a component.
 */
export type InputOf<TComponent extends ComponentObject> = TComponent extends Input ? Readonly<TComponent["input"]> : never;

type ConfigPropertyMapper<T> = (cfg: any | unknown | never) => string;

/**
 * Value or value mapper from component config.
 */
export type ValueOrConfigPropertyMapper<T> = T | ConfigPropertyMapper<T>;

//export type OutputOf<TComponent extends Component> = ReplaceProp<PickOnly<TComponent, EventSubscriber>, EventSubscriber>;

export type InputMapper<T extends object> = (i: any | unknown | never) => InputOf<T>;

export type InputOrInputMapper<T extends Constructor, TInstance extends InstanceType<T> = InstanceType<T>> = InputOf<TInstance> | InputMapper<TInstance>;

// ----

/**
 * Obtain config type from a component.
 */
 export type ConfigOf<TComponent extends ComponentObject> = TComponent extends Config ? Readonly<TComponent["config"]> : never;

 /**
  * Obtain config resolver of a component from it input
  */
 export type ConfigMapperFromInput<T extends ComponentObject> = (i: InputOf<T>) => ConfigOf<T>;

 export type ConfigOrConfigMapper<TInstance extends ComponentObject> = ConfigOf<TInstance> | ConfigMapperFromInput<TInstance>;

// ---

// Component configuration
export type ComponentConfig = Record<string, unknown>;

/**
 * @deprecated
 */
export type ComponentType = new (...args: unknown[]) => unknown;

/**
 * @deprecated
 */
export interface Component<TConfig extends ComponentConfig = ComponentConfig> {
    readonly config: Readonly<TConfig>;
    readonly name: string;

    onInit(context: MnContext, extArgs: ExternalArgs): void;
}
