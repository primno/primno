import { debug, verbose } from "../../utils";

/**
 * Definition of an event.
 */
 export interface Event {
    /**
     * Event type
     */
    type: string;
    /**
     * Event targer. Optional.
     */
    targetName?: string;
}

export class EventStorage {
    private events: Event[] = [];

    public addEvent(event: Event): void {
        verbose(`Event ${event.type} for target ${event.targetName}`);
    }

    public exist(event: Event): boolean {
        return this.events.some(e =>
            e.targetName === event.targetName &&
            e.type === event.type
        );
    }

    public removeEvent(event: Event): void {
        // TODO: Must be checked, use filter ?
        this.events.splice(this.events.indexOf(event), 1);
    }

    /** Show events */
    public printEvents(): void {
        console.info("--- Events ---");

        for (const event of this.events) {
            let controlName = event.targetName;
            if (!event.targetName)
                controlName = "NC";

            debug(`[${controlName}] | ${event.type}`);
        }

        console.info("--- Events --- ");
    }
}