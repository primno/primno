import { ComponentEvent, ControlType, ExternalArgs, ExternalEvent } from "./events";

export interface MnContext {
    controlType: ControlType;
    subscribe(event: ComponentEvent, extArgs: ExternalArgs): void;
    unsubscribe(event: ComponentEvent, extArgs: ExternalArgs): void;
    triggerEvent(event: ExternalEvent, extArgs: ExternalArgs): unknown;
}