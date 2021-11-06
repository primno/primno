import { EventType, ExternalArgs, MnEvent, PrimaryArgument } from "../../typing";
import { debug } from "../../utils";
import { Primno } from "../primno";
import { EventTypeRegister } from "./event-type-register";
import { cmdBarEventPack, formEventPack } from "./types";

/**
 * Initialize events types.
 * @param eventTypeRegister 
 * @param primno 
 */
export function initEventTypes(eventTypeRegister: EventTypeRegister, primno: Primno): void{
    formEventPack.forEach(et => eventTypeRegister.registerEventType(et));
    cmdBarEventPack.forEach(et => eventTypeRegister.registerEventType(et));

    eventTypeRegister.eventTypes.forEach(et => et.init(createCallback(et, primno)));
}

function createCallback(eventType: EventType, primno: Primno) {
    // Create callback for this event type
    return (targetName?: string, ...args: unknown[]) => {
        debug(`Callback called. Event Type: ${eventType.name}. Target name: ${targetName}`);
        // TODO: Bug here to fix  (can't be args if args[0] is used)
        const extArgs: ExternalArgs = { primaryArgument: <PrimaryArgument>args[0], args: args };
        // TODO: Create a specialized function ?
        return primno.triggerEvent.bind(primno, { type: eventType.name, targetName: targetName } as MnEvent, extArgs.primaryArgument, extArgs.args)();
    };
}