import { ComponentObject } from "../../../typing";
import { ComponentBrowser } from "../../component/component-browser";
import { EventRegister } from "../../events";
import { isComponent } from "../../metadata/helper";
import { Middleware } from "../container/container";

/**
 * Subscribe events of components.
 */
export class EventMiddleware implements Middleware {
    public get inherit(): boolean {
        return true;
    }

    public constructor(private eventRegister: EventRegister) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPreConstruct(): void {}

    onPostConstruct(instance: ComponentObject): ComponentObject {
        if (!isComponent(instance)) {
            return instance;
        }

        const componentBrowser = new ComponentBrowser(instance, instance.input);
        componentBrowser.events
            .forEach(e => this.eventRegister.addEvent({
                component: instance,
                eventHandler: instance[e.keyName],
                type: e.type,
                targetName: e.targetName
            }));

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}