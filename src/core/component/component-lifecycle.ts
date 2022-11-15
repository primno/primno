import { ComponentObject } from "../../typing";
import { hasMethod } from "../../utils";
import { ComponentEventRegister } from "../events";
import { SubComponent } from "./component-activator";
import { ComponentBrowser } from "./component-browser";

/**
 * Performs the necessary behavior to activate and deactivate a component.
 */
export class ComponentLifeCycle {
    public constructor(private eventRegister: ComponentEventRegister) {
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
                propertyName: e.keyName,
                type: e.type,
                targetName: e.targetName
            }));

        if (hasMethod(component, "mnOnInit")) {
            component.mnOnInit();
        }
    }

    /**
     * Destroy the given component and his children. Call mnOnDestroy and unregister events.
     * @param component 
     */
    public destroy(component: ComponentObject) {
        if (hasMethod(component, "mnOnDestroy")) {
            component.mnOnDestroy();
        }

        const componentBrowser = new ComponentBrowser(component, component.input);

        // Disable sub components
        componentBrowser.subComponents
            .forEach(c => {
                const activator = component[c.keyName as string] as SubComponent<ComponentObject>;
                if (activator.enabled) {
                    activator.disable();
                }
            });

        // Remove events
        componentBrowser.events
            .forEach(e => this.eventRegister.removeEvent({
                component,
                propertyName: e.keyName as string,
                type: e.type,
                targetName: e.targetName
            }));
    }
}