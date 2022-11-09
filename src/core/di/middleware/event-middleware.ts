import { ComponentObject } from "../../../typing";
import { ComponentBrowser } from "../../component/component-browser";
import { EventStorage } from "../../events/event-storage";
import { isComponent } from "../../metadata/helper";
import { Middleware } from "../container/container";

/**
 * Subscribe events of components.
 */
export class EventMiddleware implements Middleware {
    public get inherit(): boolean {
        return true;
    }

    public constructor(private eventStorage: EventStorage) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPreConstruct(): void {}

    onPostConstruct(instance: ComponentObject): ComponentObject {
        if (!isComponent(instance)) {
            return instance;
        }

        const componentBrowser = new ComponentBrowser(instance, instance.input);
        componentBrowser.events
            .forEach(e => this.eventStorage.addEvent(e));

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}