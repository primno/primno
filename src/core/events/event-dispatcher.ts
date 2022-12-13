import { debug } from "../../utils";
import { ComponentEventRegister } from "./component-event-register";
import { ComponentEvent, Event, EventArg } from '../..//typing/events';

/** Pass events to features */
export class EventDispatcher {
    private _eventRegister: ComponentEventRegister;

    constructor(eventRegister: ComponentEventRegister) {
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
        const eventHandler = event.component[event.propertyName];

        if (typeof eventHandler !== "function") {
            throw new Error(`${event.propertyName} is not a event handler of ${event.component.constructor.name}`);
        }

        const callBack = eventHandler.bind(event.component);

        try {
            return await callBack(eventArg);
        }
        catch (except: any) {
            throw new Error(`Event handler ${event.propertyName} of ${event.component.constructor.name} throw ${except.message}`);
        }
    }
}