import { Constructor, ConstructorOrObject } from '.';
import { Config, Input } from '../core/component/interface';

export type ComponentConstructor<T = Component> = Constructor<T>;
export type Component = Record<string | number | symbol, any>;
export type ComponentOrComponentConstructor = ConstructorOrObject<Component>;

/**
 * Obtain input type from a component.
 */
export type InputOf<TComponent extends Component> = TComponent extends Input ? Readonly<TComponent["input"]> : never;

type ConfigPropertyMapper<T> = (cfg: any | unknown | never) => string;

/**
 * Value or value mapper from component config.
 */
export type ValueOrConfigPropertyMapper<T> = T | ConfigPropertyMapper<T>;

//export type OutputOf<TComponent extends Component> = ReplaceProp<PickOnly<TComponent, EventSubscriber>, EventSubscriber>;

/**
 * Resolve the input value from the config of the parent component.
 */
export type InputMapper<T extends object> = (i: any | unknown | never) => InputOf<T>;

/**
 * Input value or input mapper 
 */
export type InputOrInputMapper<T extends Constructor, TInstance extends InstanceType<T> = InstanceType<T>> = InputOf<TInstance> | InputMapper<TInstance>;

// ----

/**
 * Obtain config type from a component.
 */
 export type ConfigOf<TComponent extends Component> = TComponent extends Config ? Readonly<TComponent["config"]> : never;

 /**
  * Obtain config resolver of a component from it input
  */
 export type ConfigMapperFromInput<T extends Component> = (i: InputOf<T>) => ConfigOf<T>;

 export type ConfigOrConfigMapper<TInstance extends Component> = ConfigOf<TInstance> | ConfigMapperFromInput<TInstance>;

// ---

// Component configuration
export type ComponentConfig = Record<string, unknown>;
