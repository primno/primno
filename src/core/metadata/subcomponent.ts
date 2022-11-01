import { tagged } from "inversify";
import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { ComponentConstructor, InputMapper, InputOf } from "../../typing";
import { Input } from "../component/interface";
import { Inject } from "../di/inject";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

export interface SubComponentConfig<T extends ComponentConstructor = ComponentConstructor> {
    componentType: T;
    enabled?: boolean;
    input: InstanceType<T> extends Input ? InputOf<InstanceType<T>> | InputMapper<InstanceType<T>> : never;
}


export const componentActivatorIdentifier = "subcomponent";

export function MnSubComponent<T extends ComponentConstructor>(config: SubComponentConfig<T>) {
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {
        Inject(componentActivatorIdentifier)(target, targetKey, indexOrPropertyDescriptor);
    
        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("subcomponent", config);

        // TODO: Try to remove this
        tagged("subcomponent", config)(target, targetKey, indexOrPropertyDescriptor);
    };
}
