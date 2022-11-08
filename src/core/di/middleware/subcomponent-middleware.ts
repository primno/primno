import { ComponentObject } from "../../../typing";
import { verbose } from "../../../utils";
import { ComponentActivator } from "../../component/component-activator";
import { SubComponentConfig } from "../../metadata/subcomponent";
import { PropertyMetadata } from "../../reflection/property";
import { Container, Middleware } from "../container/container";

/**
 * Create the ComponentActivator for each sub components of a component.
 * Prepare the subcomponent to be enabled/disabled with his container.
 */
export class SubComponentMiddleware implements Middleware {
    get inherit(): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPreConstruct(): void {}

    onPostConstruct(instance: ComponentObject, container: Container): ComponentObject {
        for (const key in instance) {
            const property = new PropertyMetadata(instance, key);
            const isSubComponent = property.hasMetadata("subcomponent");
    
            if (isSubComponent) {
                const subComponentMetadata = property.getMetadata<SubComponentConfig<any>>("subcomponent");
    
                verbose(`Subcomponent ${subComponentMetadata.component.name} find in ${instance.constructor.name} for ${key} property.`);
    
                const resolveInput = () => {
                    switch (typeof subComponentMetadata.input) {
                        case "function": {
                            if (instance.config) {
                                return subComponentMetadata.input(instance.config);
                            }
                            else {
                                throw new Error(`Config required in ${instance.constructor.name}`);
                            }
                        }
                        case "object": return subComponentMetadata.input;
                        case "undefined": return undefined;
                        default: throw new Error("Unsupported input type");
                    }
                };

                const componentActivator = new ComponentActivator(subComponentMetadata.component, container, resolveInput());
                // TODO: Replace with proxy to component activator
                instance[key] = componentActivator;

                if (subComponentMetadata.enabled) {
                    componentActivator.enable();
                }
            }
        }

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}