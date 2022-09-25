import { ComponentObject } from "../../../typing";
import { getMethods, verbose } from "../../../utils";
// TODO: Replace
//import { EventStorage } from "../../event/events";
import { EventConfig } from "../../metadata/events";
import { isComponent } from "../../metadata/helper";
import { PropertyMetadata } from "../../reflection/property";
import { Container, Middleware } from "../container/container";

class EventStorage {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public addEvent(...any: any[]): void {}
}

export class EventMiddleware implements Middleware {
    public get inherit(): boolean {
        return true;
    }

    public constructor(private eventStorage: EventStorage) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPreConstruct(identifier: any, key?: string | number | symbol | undefined): void {}

    onPostConstruct(instance: ComponentObject, container: Container): unknown {
        if (!isComponent(instance)) {
            return;
        }

        for (const key of getMethods(instance)) {
            const property = new PropertyMetadata(instance, key);
            const isEvent = property.hasMetadata("event");

            const resolveInput = (input: unknown) => {
                switch (typeof input) {
                    case "function": {
                        if (instance.input) {
                            return input(instance.input);
                        }
                        else {
                            throw new Error("Input required");
                        }
                    }
                    default:
                        return input;
                }
            };

            if (isEvent) {
                const eventConfig = property.getMetadata("event") as EventConfig;
                const input = resolveInput(eventConfig.target);
                verbose(`Event ${eventConfig.type} with input ${input}`);
                this.eventStorage.addEvent(eventConfig.type, eventConfig.target as string, (...args: any[]) => instance[key](...args));
            }
        }

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}