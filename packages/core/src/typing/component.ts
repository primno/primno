import { Constructor, ConstructorOrObject } from '.';
import { Config, Input } from '../core/component/interface';

/**
 * Component constructor.
 * @category Component
 * @typeparam T Component type.
 * @internal
 */
export type ComponentConstructor<T = Component> = Constructor<T>;

/**
 * Component instance.
 * @category Component
 * @internal
 */
export type Component = Record<string | number | symbol, any>;

/**
 * Component or component constructor.
 * @category Component
 * @internal
 */
export type ComponentOrComponentConstructor = ConstructorOrObject<Component>;

/**
 * Obtain input type from a component by extracting the `input` property type.
 * @category Component
 * @typeparam TComponent Component type.
 */
export type InputOf<TComponent extends Component> = TComponent extends Input ? Readonly<TComponent["input"]> : never;

/**
 * Function that resolve the value from the component config.
 */
type ConfigPropertyMapper<T> = (cfg: any | unknown | never) => string;

/**
 * Value or callback to resolve the value from the config of the component.
 * @category Component
 */
export type ValueOrConfigPropertyMapper<T> = T | ConfigPropertyMapper<T>;

//export type OutputOf<TComponent extends Component> = ReplaceProp<PickOnly<TComponent, EventSubscriber>, EventSubscriber>;

/**
 * Resolve the input value from the config of the parent component.
 * @category Component
 */
export type InputMapper<T extends object> = (i: any | unknown | never) => InputOf<T>;

/**
 * Input value or input mapper.
 * @category Component
 */
export type InputOrInputMapper<T extends Constructor, TInstance extends InstanceType<T> = InstanceType<T>> = InputOf<TInstance> | InputMapper<TInstance>;

// ----

/**
 * Gets config type from a component by extracting the `config` property type.
 * Can be used in conjunction with the {@link @MnSubComponent} decorator
 * to obtain the config type of the current component
 * when resolve the input of the sub-component from the config of the parent component.
 * @category Component
 */
export type ConfigOf<TComponent extends Component> = TComponent extends Config ? Readonly<TComponent["config"]> : never;

/**
 * Function that resolve the config from the input of the component.
 * @category Component
*/
export type ConfigMapperFromInput<T extends Component> = (i: InputOf<T>) => ConfigOf<T>;

/**
 * Configuration value or callback to resolve the config from the input property of the component.
 * @category Component
 */
export type ConfigOrConfigMapper<TInstance extends Component> = ConfigOf<TInstance> | ConfigMapperFromInput<TInstance>;

// ---

/**
 * Component configuration.
 * @ignore
 */
export type ComponentConfig = Record<string, unknown>;
