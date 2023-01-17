import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { ComponentConstructor, InputMapper, InputOf } from "../../typing";
import { Input } from "../component/interface";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

/**
 * Sub component configuration without input.
 */
interface SubComponentConfigNone<T> {
    /**
     * Component
     */
     component: T;
     /**
      * Default state of the component.
      * @default true
      */
     enabled?: boolean;
}

/**
 * Sub component configuration with input.
 */
interface SubComponentConfigInput<T extends ComponentConstructor = ComponentConstructor> extends SubComponentConfigNone<T> {
     /**
     * Input value or input mapper sent to the sub component.
     */
    input: InputOf<InstanceType<T>> | InputMapper<InstanceType<T>>;
}

/**
 * Sub component configuration.
 */
export type SubComponentConfig<T extends ComponentConstructor = ComponentConstructor> = InstanceType<T> extends Input ? SubComponentConfigInput<T> : SubComponentConfigNone<T>;

/**
 * Decorator that mark a property as sub component.
 * @param config Configuration of the sub component.
 */
export function MnSubComponent<T extends ComponentConstructor>(config: SubComponentConfig<T>) {
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {  
        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("subcomponent", config);
    };
}
