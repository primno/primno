import { ComponentObject } from "../../../typing";
import { error, verbose } from "../../../utils";
import { ComponentActivator } from "../../component/component-activator";
import { SubComponentConfig } from "../../metadata/subcomponent";
import { PropertyMetadata } from "../../reflection/property";
import { ComponentContainer } from "../container/component-container";
import { Container, Middleware } from "../container/container";

export class SubComponentMiddleware implements Middleware {
    get inherit(): boolean {
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPreConstruct(identifier: any, key?: string | number | symbol | undefined): void {}

    onPostConstruct(instance: ComponentObject, container: Container): ComponentObject {
        for (const key in instance) {
            const property = new PropertyMetadata(instance, key);
            const isSubComponent = property.hasMetadata("subcomponent");
    
            if (isSubComponent) {
                const subComponentMetadata = property.getMetadata("subcomponent") as SubComponentConfig;
    
                verbose(`Subcomponent ${subComponentMetadata.componentType.name} find in ${instance.constructor.name} for ${key} property.`);
    
                const componentActivator = instance[key] as ComponentActivator<ComponentObject>;
                if (!(componentActivator instanceof ComponentActivator)) {
                    error(`Property mark as subcomponent but ComponentActivator not found`);
                    continue;
                }
    
                const resolveInput = () => {
                    switch (typeof subComponentMetadata.input) {
                        case "function": {
                            if (instance.input) {
                                return subComponentMetadata.input(instance.input);
                            }
                            else {
                                throw new Error("Input required");
                            }
                        }
                        case "object": return subComponentMetadata.input;
                        case "undefined": return undefined;
                        default: throw new Error("Unsupported input type");
                    }
                };
    
                const childContainer = new ComponentContainer(subComponentMetadata.componentType, container);
                childContainer.bindInput(resolveInput());
                componentActivator.init(childContainer);
            }
        }

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}