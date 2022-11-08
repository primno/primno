import { EventType, ExternalArgs, ExternalEvent, Control } from "../../typing";
import { debug } from "../../utils";
import { Primno } from "../primno";
import { EventTypeRegister } from "./event-type-register";
import { cmdBarEventPack, formEventPack } from "./types";

/**
 * Initialize events types.
 * @param eventTypeRegister 
 * @param primno 
 */
export function initEventTypes(eventTypeRegister: EventTypeRegister, primno: Primno): void {
    formEventPack.forEach(et => eventTypeRegister.registerEventType(et));
    cmdBarEventPack.forEach(et => eventTypeRegister.registerEventType(et));

    eventTypeRegister.eventTypes.forEach(et => et.init(createCallback(et, primno)));
}

function createCallback(eventType: EventType, primno: Primno) {
    // Create callback for this event type
    return (targetName?: string, ...args: unknown[]) => {
        debug(`Callback called. Event Type: ${eventType.name}. Target name: ${targetName}`);
        const [firstArg, secondArg, ...othersArgs] = args;

        const extArgs: ExternalArgs = {
            selectedControl: firstArg as Control,
            primaryControl: secondArg as Control,
            args: othersArgs
        };

        return primno.triggerEvent.bind(
            primno,
            {
                type: eventType.name,
                targetName: targetName
            } as ExternalEvent,
            extArgs.selectedControl,
            extArgs.primaryControl,
            extArgs.args
        )();
    };
}