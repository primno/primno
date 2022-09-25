import { Constructor, MnContext } from '.';
import { Input } from '../core/component/interface';
import { ExternalArgs } from './events';

export type ComponentConstructor<T = ComponentObject> = Constructor<T>;
export type ComponentObject = Record<string | number | symbol, any>;

/**
 * Obtain input type from a component.
 */
 export type InputOf<TComponent extends ComponentObject> = TComponent extends Input ? Readonly<TComponent["input"]> : never;

  type InputPropertyMapper<T> = (i: any | unknown | never) => string;
 
 export type ValueOrInputPropertyMapper<T> =T | InputPropertyMapper<T>;
 
 
 //export type OutputOf<TComponent extends Component> = ReplaceProp<PickOnly<TComponent, EventSubscriber>, EventSubscriber>;

 type InputMapper<T extends object> = (i: any | unknown | never) => InputOf<T>;

export type InputOrInputMapper<T extends Constructor, TInstance extends InstanceType<T> = InstanceType<T>> = InputOf<TInstance> | InputMapper<TInstance>;

// ----

// Component configuration
export type ComponentConfig = Record<string, unknown>;
export type ComponentType = new (...args: unknown[]) => unknown;

export interface Component<TConfig extends ComponentConfig = ComponentConfig> {
    readonly config: Readonly<TConfig>;
    readonly name: string;

    onInit(context: MnContext, extArgs: ExternalArgs): void;
}
