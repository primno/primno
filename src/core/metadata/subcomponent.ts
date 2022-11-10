import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { ComponentConstructor, InputMapper, InputOf } from "../../typing";
import { Input } from "../component/interface";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

/**
 * Sub component configuration.
 */
export interface SubComponentConfig<T extends ComponentConstructor = ComponentConstructor> {
    /**
     * Component
     */
    component: T;
    /**
     * Default state of the component.
     * @default true
     */
    enabled?: boolean;
    /**
     * Input value or input mapper sent to the sub component.
     */
    input: InstanceType<T> extends Input ? InputOf<InstanceType<T>> | InputMapper<InstanceType<T>> : never;
}

export function MnSubComponent<T extends ComponentConstructor>(config: SubComponentConfig<T>) {
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {  
        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("subcomponent", config);
    };
}
