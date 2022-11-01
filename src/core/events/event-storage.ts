import { verbose } from "../../utils";
import { EventType } from "../metadata";

export class EventStorage {
    public addEvent(eventType: EventType, target: string | undefined, ...any: any[]): void {
        verbose(`Event ${eventType}`);
    }
}