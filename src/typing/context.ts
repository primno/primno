import { ComponentEvent, ControlType, ExternalArgs, MnEvent } from "./events";

export interface MnContext {
    controlType: ControlType;
    subscribe(event: ComponentEvent, extArgs: ExternalArgs): void;
    unsubscribe(event: ComponentEvent, extArgs: ExternalArgs): void;
    triggerEvent(event: MnEvent, extArgs: ExternalArgs): any;
}