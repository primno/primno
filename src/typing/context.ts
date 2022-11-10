import { ComponentEvent, ControlType, ExternalArgs, Event } from "./events";

export interface MnContext {
    controlType: ControlType;
    subscribe(event: ComponentEvent, extArgs: ExternalArgs): void;
    unsubscribe(event: ComponentEvent, extArgs: ExternalArgs): void;
    triggerEvent(event: Event, extArgs: ExternalArgs): unknown;
}