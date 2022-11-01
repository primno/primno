import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { ComponentObject, ConfigOrConfigMapper } from "../../typing";
import { Inject } from "../di";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

/**
 * Decorator that mark the property as component config.
 * @returns 
 */
 export function MnConfig<TComp extends ComponentObject = ComponentObject>(config: ConfigOrConfigMapper<TComp>) {
    // TODO: Make decorator helper
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {
        Inject("config")(target, targetKey, indexOrPropertyDescriptor);

        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("config", config);
    }
}