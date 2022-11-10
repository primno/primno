import { debug, error, notifyCriticalError } from "../../utils";
import { EventRegister } from "./event-register";
import { ComponentEvent, Event, EventArg } from '../..//typing/events';

/** Pass events to features */
export class EventDispatcher {
    private _eventRegister: EventRegister;

    constructor(eventRegister: EventRegister) {
        this._eventRegister = eventRegister;
    }

    /**
     * Creates and sends the event to all the features that have subscribed to it. 
     * @param event Event.
     * @param eventArg Event Argument
     */
    public dispatchComponentEvent(event: Event, eventArg: EventArg): unknown {
        const dispatchedEvent = this._eventRegister.events
            .filter(e => e.type == event.type && e.targetName == event.targetName);

        let firstResponse = null;

        if (dispatchedEvent.length == 0) {
            debug(`No listener found for event type ${event.type} and target name ${event.targetName}`);
        }

        for (const e of dispatchedEvent) {
            // TODO: Beware of asynchronous events 
            const returnValue = this.callComponentEventHandler(e, eventArg);
            // TODO: Create the response pattern based on what the event type describes 
            if (firstResponse == null) {
                firstResponse = returnValue;
            }
        }

        return firstResponse;
    }

    /**
     * Call the component's event handler with its this (the component).
     * @param event
     * @param eventCtx
     */
    private async callComponentEventHandler(event: Readonly<ComponentEvent>, eventArg: EventArg): Promise<unknown> {
        const callBack = event.eventHandler.bind(event.component);

        try {
            return await callBack(eventArg);
        }
        catch (except: any) {
            error(`Unhandled exception in a feature event handler: ${except.message}`);
            notifyCriticalError(`Event handler ${event.eventHandler.name} of ${event.component} throw an exception.` +
                `Exception: ${except.name} => ${except.message}. Stacktrace: ${except.stack}`);
        }
    }
}