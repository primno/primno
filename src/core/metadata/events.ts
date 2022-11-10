import { EventTypes } from "../../typing";
import { ValueOrConfigPropertyMapper } from "../../typing/component";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

export interface EventConfig {
    target?: ValueOrConfigPropertyMapper<string>;
    type: EventTypes;
}

function makeEventDecorator(eventConfig: EventConfig) {
    return function (target: any, key: any, descriptor: PropertyDescriptor) {
        const primnoTarget = new MetadataDecoratorHelper(target, key);
        primnoTarget.setMetadata("event", eventConfig);
    }
}

export function MnOnCommandInvoke(commandName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.CommandInvoke,
        target: commandName
    });
}

export function MnOnDataLoad() {
    return makeEventDecorator({
        type: EventTypes.DataLoad
    });
}

export function MnOnEnableRule(name: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.EnableRule,
        target: name
    });
}

export function MnOnFieldChange(fieldName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.FieldChange,
        target: fieldName
    });
}

export function MnOnFormLoad() {
    return makeEventDecorator({ type: EventTypes.FormLoad });
}

export function MnOnGridLoad() {
    return makeEventDecorator({ type: EventTypes.GridLoad });
}

export function MnOnIframeLoaded(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.IframeLoaded,
        target: controlName
    });
}

export function MnOnLookupTagClick(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.LookupTagClick,
        target: controlName
    });
}

export function MnOnPopulateQuery(name: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.PopulateQuery,
        target: name
    });
}

export function MnOnPreProcessStatusChange() {
    return makeEventDecorator({
        type: EventTypes.PreProcessStatusChange
    });
}

export function MnOnPreSearch(controlName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.PreSearch,
        target: controlName
    });
}

export function MnOnPreStageChange() {
    return makeEventDecorator({
        type: EventTypes.PreStageChange
    });
}

export function MnOnProcessStatusChange() {
    return makeEventDecorator({
        type: EventTypes.ProcessStatusChange
    });
}

export function MnOnSave() {
    return makeEventDecorator({
        type: EventTypes.Save
    });
}

export function MnOnStageChange() {
    return makeEventDecorator({
        type: EventTypes.StageChange
    });
}

export function MnOnStageSelected() {
    return makeEventDecorator({
        type: EventTypes.StageSelected
    });
}

export function MnOnTabState(tabName: ValueOrConfigPropertyMapper<string>) {
    return makeEventDecorator({
        type: EventTypes.TabStateChange,
        target: tabName
    });
}
