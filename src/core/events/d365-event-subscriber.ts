import { Control, ControlType, Event } from "../../typing";
import { debug, error, getControlType, verbose } from "../../utils";
import { EventTypeRegister } from "./event-type-register";

/**
 * Subscribe to D365 events in runtime.
 * Ensure that only one subscribe is done.
 */
export class D365EventSubscriber {
    public constructor(
        private eventTypeRegister: EventTypeRegister,
        private primaryControl: Control
    ) {
        const controlType = getControlType(primaryControl);
        if (controlType == null) {
            throw new Error("Control type of primary control can't be resolved")
        }
        
        this.controlType = controlType;
    }

    private events: Event[] = [];
    private controlType: ControlType;

    /**
     * Subscribe an event to D365 if possible.
     * @param event Event to subscribe.
     * @returns
     */
    public subscribe(event: Event): void {
        const eventType = this.eventTypeRegister.getEventType(event.type);

        if (eventType == null) {
            throw new Error(`Event type ${event.type} unknow`);
        }

        if (!eventType.subscribable) {
            error(`${event.type} can't be subscribe to D365 at runtime with this control type`);
            return;
        }
        
        if (!this.events.find(e => e.type === event.type && e.targetName === event.targetName)) {
            debug(`Subscribe to D365 ${event.type} event with target name ${event.targetName}`);
            try {
                eventType.subscribe(this.primaryControl, event.targetName);
                this.events.push(event);
            }
            catch (except: any) {
                error(except.message);
            }
        }
        else {
            verbose(`Event ${event.type} for ${event.targetName} already subscribed`);
        }
    }

    public unsubscribe(event: Event) {
        throw new Error("Not implemented");
    }
}