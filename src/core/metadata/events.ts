import { EventTypes } from "../../typing";
import { ValueOrConfigPropertyMapper } from "../../typing/component";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

export interface EventConfig {
    target?: ValueOrConfigPropertyMapper<string>;
    type: EventTypes;
}

export function MnOnLoad() {
    return function (target: any, key?: any, index?: any) {
        const primnoTarget = new MetadataDecoratorHelper(target, key, index);
        primnoTarget.setMetadata("event", {
            type: EventTypes.FormLoad
        } as EventConfig);
    }
}

export function MnOnFieldChange(fieldName: ValueOrConfigPropertyMapper<string>) {
    return function (target: any, key: any, descriptor: PropertyDescriptor) {
        // TODO: Replace with helper
        const primnoTarget = new MetadataDecoratorHelper(target, key);
        primnoTarget.setMetadata("event", {
            type: EventTypes.FieldChange,
            target: fieldName
        } as EventConfig);
    }
}

export function MnOnTabState(tabName: ValueOrConfigPropertyMapper<string>) {
    return function (target: any, key: any, descriptor: PropertyDescriptor) {
        const primnoTarget = new MetadataDecoratorHelper(target, key);
        primnoTarget.setMetadata("event", {
            type: EventTypes.TabStateChange,
            target: tabName
        } as EventConfig);
    }
}
