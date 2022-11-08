import { ComponentObject } from "../../../typing";
import { getMethods } from "../../../utils";
import { EventStorage } from "../../events/event-storage";
import { EventConfig } from "../../metadata/events";
import { isComponent } from "../../metadata/helper";
import { PropertyMetadata } from "../../reflection/property";
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

    onPostConstruct(instance: ComponentObject): unknown {
        if (!isComponent(instance)) {
            return;
        }

        const resolveTarget = (valueOrValueMapper: unknown) => {
            switch (typeof valueOrValueMapper) {
                case "function": {
                    if (instance.config) {
                        return valueOrValueMapper(instance.config);
                    }
                    else {
                        throw new Error("Config required");
                    }
                }
                default:
                    return valueOrValueMapper;
            }
        };

        for (const key of getMethods(instance)) {
            const property = new PropertyMetadata(instance, key);
            const isEvent = property.hasMetadata("event");

            if (isEvent) {
                const eventConfig = property.getMetadata("event") as EventConfig;
                const target = resolveTarget(eventConfig.target);
                // TODO: Event register ?
                this.eventStorage.addEvent({
                    type: eventConfig.type,
                    targetName: target,
                    callback: (...args: any[]) => instance[key](...args)
                });
            }
        }

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}