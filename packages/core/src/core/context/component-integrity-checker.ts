import { ComponentConstructor } from "../../typing";
import { ComponentBrowser, EventMetadata } from "../component/component-browser";
import { EventTypeRegister } from "../events/event-type-register";
import { getComponentConfig } from "../metadata/helper";

interface IntegrityError {
    message: string;
    component: ComponentConstructor;
}

export class IntegrityResult {
    private _errors: IntegrityError[] = [];

    public constructor(errors: IntegrityError[] = []) {
        this._errors = errors;
    }

    public get hasError(): boolean {
        return this.errors.length > 0;
    }

    public get errors(): IntegrityError[] {
        return this._errors;
    }
}

export class ComponentIntegrityChecker {
    private eventTypeRegister: EventTypeRegister;

    public constructor(eventTypeRegister: EventTypeRegister) {
        this.eventTypeRegister = eventTypeRegister;
    }

    /**
     * Check if the event is supported by the component.
     * @param event Event metadata
     * @param component Component constructor
     * @returns Error or null
     */
    private checkEvent(event: EventMetadata, component: ComponentConstructor): IntegrityError | null {
        const eventType = this.eventTypeRegister.getEventType(event.type);

        if (eventType == null) {
            return {
                message: `The event ${event.type} is unknown`,
                component
            };
        }

        const componentMetadata = getComponentConfig(component);
        const pageType = componentMetadata?.scope?.pageType;

        if (pageType == null) {
            return {
                message: `Page type can't be found`,
                component
            };
        }

        if (!eventType.supportedPageType.includes(pageType)) {
            return {
                message: `The event ${event.type} is not supported by page type ${pageType}. Supported: ${eventType.supportedPageType.join(", ")}`,
                component
            };
        }

        return null;
    }

    /**
     * Check if the component have unauthorized events.
     * @param cb Component browser
     * @returns List of errors
     */
    private checkEventIntegrity(cb: ComponentBrowser): IntegrityError[] {
        const errors: IntegrityError[] = [];

        for (const event of cb.events) {
            const error = this.checkEvent(event, cb.componentType as ComponentConstructor);
            if (error != null) {
                errors.push(error);
            }
        }

        cb.subComponents.forEach(c => {
            errors.push(...this.checkEventIntegrity(c));
        });

        return errors;
    }
    
    /**
     * Check that the component doesn't have an input.
     * @param cb Component browser
     * @returns List of errors
     */
    private checkInput(cb: ComponentBrowser): IntegrityError[] {
        if (cb.hasInput) {
            return [{
                message: `Bootstrap component must not have an input`,
                component: cb.componentType as ComponentConstructor
            }];
        }

        return [];
    }

    /**
     * Check if the component have a static value for the config.
     * @param cb Component browser
     * @returns List of errors
     */
    private checkConfig(cb: ComponentBrowser): IntegrityError[] {
        if (!cb.hasStaticConfig) {
            return [{
                message: `Bootstrap component must have a static value in its config`,
                component: cb.componentType as ComponentConstructor
            }];
        }

        return [];
    }

    /**
     * Check the integrity of the component.
     * @param rootComponentConstructor Root component constructor
     * @returns Integrity result
     */
    public check(rootComponentConstructor: ComponentConstructor): IntegrityResult {
        const cb = new ComponentBrowser(rootComponentConstructor);

        return new IntegrityResult(
            [
                // TODO: Add input check
                ...this.checkConfig(cb),
                ...this.checkEventIntegrity(cb)
            ]
        );
    }
}
