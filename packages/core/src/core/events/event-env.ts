import { EventDispatcher } from "./event-dispatcher";
import { ComponentEventRegister } from "./component-event-register";
import { EventTypeRegister } from "./event-type-register";

/**
 * Provides event support for a given environment.
 */
export class EventEnv {
    private _eventRegister: ComponentEventRegister = new ComponentEventRegister();
    private _eventTypeRegister: EventTypeRegister = new EventTypeRegister();
    private _eventDispatcher: EventDispatcher;

    constructor() {
        this._eventDispatcher = new EventDispatcher(this.eventRegister);
    }

    public get eventRegister(): ComponentEventRegister {
        return this._eventRegister;
    }

    public get eventTypeRegister(): EventTypeRegister {
        return this._eventTypeRegister;
    }

    public get eventDispatcher(): EventDispatcher {
        return this._eventDispatcher;
    }
}