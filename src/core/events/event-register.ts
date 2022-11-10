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
        debug(`Adding ${event.type} event targeting ${event.targetName} for the component ${event.component.constructor.name}`);
        this.events.push(event);
    }

    public exist(event: ComponentEvent): boolean {
        return (this.events.some(e => e.component == event.component &&
            e.propertyName === event.propertyName &&
            e.targetName === event.targetName &&
            e.type === event.type));
    }

    public removeEvent(event: ComponentEvent): void {
        debug(`Removing ${event.type} event targeting ${event.targetName} for the component ${event.component.constructor.name}`);
        this.events.splice(this.events.indexOf(event), 1);
    }

    /** Show events in console */
    public printEvents(): void {
        debug("--- Events ---");

        for (const event of this.events) {
            const controlName = event.targetName ?? "NC";

            debug(`[${controlName}] | ${event.type} => ${event.component.constructor.name}`);
        }

        debug("--- Events --- ");
    }
}