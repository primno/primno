import { Control, Event } from "../../typing";
import { debug, error, verbose } from "../../utils";
import { EventTypeRegister } from "./event-type-register";

/**
 * Subscribe to Power Apps events at runtime.
 * Ensure that only one subscribe is done.
 */
export class PowerAppsEventSubscriber {
    public constructor(
        private eventTypeRegister: EventTypeRegister,
        private primaryControl: Control
    ) {}

    private events: Event[] = [];

    /**
     * Subscribe an event to Power Apps if possible.
     * @param event Event to subscribe.
     * @returns
     */
    public subscribe(event: Event): void {
        const eventType = this.eventTypeRegister.getEventType(event.type);

        if (eventType == null) {
            throw new Error(`Event type ${event.type} unknown`);
        }

        if (!eventType.subscribable) {
            verbose(`${event.type} can't be subscribed at runtime. Event ignored`);
            return;
        }
        
        if (!this.events.find(e => e.type === event.type && e.targetName === event.targetName)) {
            debug(`Subscribe to ${event.type} event at runtime with target name ${event.targetName}`);
            try {
                eventType.subscribe(this.primaryControl, event.targetName);
                this.events.push(event);
            }
            catch (except: any) {
                error(`Unable to subscribe the ${event.type} event at runtime with target name ${event.targetName}: ${except.message}`);
            }
        }
        else {
            verbose(`Event ${event.type} for ${event.targetName} already subscribed`);
        }
    }

    // public unsubscribe(event: Event) {
    //     throw new Error("Not implemented");
    // }
}