import { EventDispatcher } from "./event-dispatcher";
import { EventRegister } from "./event-register";
import { EventTypeRegister } from "./event-type-register";

/**
 * Provides event support for a given environment.
 */
export class EventEnv {
    private _eventRegister: EventRegister = new EventRegister();
    private _eventTypeRegister: EventTypeRegister = new EventTypeRegister();
    private _eventDispatcher: EventDispatcher;

    constructor() {
        this._eventDispatcher = new EventDispatcher(this.eventRegister);
    }

    public get eventRegister(): EventRegister {
        return this._eventRegister;
    }

    public get eventTypeRegister(): EventTypeRegister {
        return this._eventTypeRegister;
    }

    public get eventDispatcher(): EventDispatcher {
        return this._eventDispatcher;
    }
}