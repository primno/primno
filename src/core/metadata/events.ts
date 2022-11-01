import { ValueOrConfigPropertyMapper } from "../../typing/component";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

export enum EventType {
    load = "Load",
    fieldChange = "FieldChange",
    tabState = "TabState"
}

export interface EventConfig {
    target?: ValueOrConfigPropertyMapper<string>;
    type: EventType;
}

export function MnOnLoad() {
    return function (target: any, key?: any, index?: any) {
        const primnoTarget = new MetadataDecoratorHelper(target, key, index);
        primnoTarget.setMetadata("event", {
            type: EventType.load
        } as EventConfig);
    }
}

export function MnOnFieldChange(fieldName: ValueOrConfigPropertyMapper<string>) {
    return function (target: any, key: any, descriptor: PropertyDescriptor) {
        // TODO: Replace with helper
        const primnoTarget = new MetadataDecoratorHelper(target, key);
        primnoTarget.setMetadata("event", {
            type: EventType.fieldChange,
            target: fieldName
        } as EventConfig);
    }
}

export function MnOnTabState(tabName: ValueOrConfigPropertyMapper<string>) {
    return function (target: any, key: any, descriptor: PropertyDescriptor) {
        const primnoTarget = new MetadataDecoratorHelper(target, key);
        primnoTarget.setMetadata("event", {
            type: EventType.fieldChange,
            target: tabName
        } as EventConfig);
    }
}
