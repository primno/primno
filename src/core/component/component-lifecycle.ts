import { ComponentObject } from "../../typing";
import { hasMethod } from "../../utils";
import { EventRegister } from "../events";
import { ComponentBrowser } from "./component-browser";

/**
 * Performs the necessary behavior to activate and deactivate a component.
 */
export class ComponentLifeCycle {
    public constructor(private eventRegister: EventRegister) {
    }

    /**
     * Init the given component. Call mnOnInit and register events.
     * @param component 
     */
    public init(component: ComponentObject) {
        const componentBrowser = new ComponentBrowser(component, component.input);
        componentBrowser.events
            .forEach(e => this.eventRegister.addEvent({
                component,
                eventHandler: component[e.keyName],
                type: e.type,
                targetName: e.targetName
            }));

        if (hasMethod(component, "mnOnInit")) {
            component.mnOnInit();
        }
    }

    /**
     * Destroy the given component. Call mnOnDestroy and unregister events.
     * @param component 
     */
    public destroy(component: ComponentObject) {
        if (hasMethod(component, "mnOnDestroy")) {
            component.mnOnDestroy();
        }

        const componentBrowser = new ComponentBrowser(component, component.input);
        componentBrowser.events
            .forEach(e => this.eventRegister.removeEvent({
                component,
                eventHandler: component[e.keyName],
                type: e.type,
                targetName: e.targetName
            }));
    }
}