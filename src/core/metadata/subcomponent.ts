import { tagged } from "inversify";
import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { ComponentConstructor, InputOrInputMapper } from "../../typing";
import { Input } from "../component/interface";
import { Inject } from "../di/inject";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

export interface SubComponentConfig {
    componentType: ComponentConstructor;
    enabled: boolean;
    input: any;
}

type SubComponentDecoratorWithConfig = <T extends ComponentConstructor<Input>>(componentType: T, enabled: boolean, config: InputOrInputMapper<T>) => any;
type SubComponentDecoratorWithoutConfig = <T extends ComponentConstructor>(componentType: T, enabled: boolean, config?: never) => any;
type SubComponentDecorator = SubComponentDecoratorWithConfig & SubComponentDecoratorWithoutConfig;

export const componentActivatorIdentifier = "subcomponent";

export const MnSubComponent: SubComponentDecorator = <
    T extends ComponentConstructor
>(componentType: T, enabled = true, input?: any) => {
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {
        Inject(componentActivatorIdentifier)(target, targetKey, indexOrPropertyDescriptor);
    
        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("subcomponent", {
            componentType,
            enabled,
            input
        } as SubComponentConfig);

        // TODO: Try to remove this
        tagged("subcomponent", {
            componentType,
            enabled,
            input
        } as SubComponentConfig)(target, targetKey, indexOrPropertyDescriptor);
    };
};
