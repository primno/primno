import { ComponentEvent } from '../../typing/events';
import { debug } from '../../utils';

/** Event register for components **/
export class EventRegister {
    /** Events */
    private _events: ComponentEvent[] = [];

    /** Get the list of subscribed events  */
    public get events(): ComponentEvent[] {
        return this._events;
    }

    /**
     * Add an event
     * @param event Event
     */
    public addEvent(event: ComponentEvent): void {
        debug(`Event ${event.type} for ${event.targetName} added to ${event.component.constructor.name}`);
        this.events.push(event);
    }

    public exist(event: ComponentEvent): boolean {
        return (this.events.some(e => e.component == event.component &&
            e.eventHandler === event.eventHandler &&
            e.targetName === event.targetName &&
            e.type === event.type));
    }

    public removeEvent(event: ComponentEvent): void {
        // TODO: Must be checked, use filter ?
        this.events.splice(this.events.indexOf(event), 1);
    }

    /** Show events in console */
    public printEvents(): void {
        console.info("--- Events ---");

        for (const event of this.events) {
            let controlName = event.targetName;
            if (!event.targetName)
                controlName = "NC";

            console.info(`[${controlName}] | ${event.type} => ${event.component.name}`);
        }

        console.info("--- Events --- ");
    }
}