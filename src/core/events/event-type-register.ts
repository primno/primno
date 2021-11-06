import { EventType } from '../../typing';

/**
 * Events types register.
 */
export class EventTypeRegister /*implements EventSubscriber*/ {
    private _eventTypes: EventType[] = [];

    public getEventType(typeName: string) : EventType | undefined {
        return this.eventTypes.find(f => f.name == typeName);
    }

    /**
     * Register an event type.
     * @param eventType Event type
     * @returns
     */
    public registerEventType(eventType: EventType): void {
        if (this._eventTypes.some(et => et.name == eventType.name)) {
            return; // Allready registered
        }

        this._eventTypes.push(eventType);
    }

    public get eventTypes(): EventType[] {
        return this._eventTypes;
    }
}
