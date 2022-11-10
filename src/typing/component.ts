import { Constructor, ConstructorOrObject } from '.';
import { Config, Input } from '../core/component/interface';

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
 export type ConfigOf<TComponent extends ComponentObject> = TComponent extends Config ? Readonly<TComponent["config"]> : never;

 /**
  * Obtain config resolver of a component from it input
  */
 export type ConfigMapperFromInput<T extends ComponentObject> = (i: InputOf<T>) => ConfigOf<T>;

 export type ConfigOrConfigMapper<TInstance extends ComponentObject> = ConfigOf<TInstance> | ConfigMapperFromInput<TInstance>;

// ---

// Component configuration
export type ComponentConfig = Record<string, unknown>;
