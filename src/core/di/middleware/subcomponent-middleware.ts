import { ComponentObject } from "../../../typing";
import { throwError, verbose } from "../../../utils";
import { ComponentActivator } from "../../component/component-activator";
import { SubComponentConfig } from "../../metadata/subcomponent";
import { PropertyMetadata } from "../../reflection/property";
import { ComponentContainer } from "../container/component-container";
import { Container, Middleware } from "../container/container";

/**
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
                const subComponentMetadata = property.getMetadata("subcomponent") as SubComponentConfig<any>;
    
                verbose(`Subcomponent ${subComponentMetadata.componentType.name} find in ${instance.constructor.name} for ${key} property.`);
    
                // TODO: Create ComponentActivator here and remove injection
                const componentActivator = instance[key] as ComponentActivator<ComponentObject>;
                if (!(componentActivator instanceof ComponentActivator)) {
                    throwError(`Property mark as subcomponent but ComponentActivator not found`);
                    continue;
                }
    
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

                // const resolveConfig = (input: any) => {
                //     switch (typeof subComponentMetadata.input) {
                //         case "function": {
                //             if (instance.config) {
                //                 return subComponentMetadata.input(instance.config);
                //             }
                //             else {
                //                 throw new Error(`Config required in ${instance.constructor.name}`);
                //             }
                //         }
                //         case "object": return subComponentMetadata.input;
                //         case "undefined": return undefined;
                //         default: throw new Error("Unsupported input type");
                //     }
                // };

                const input = resolveInput();
                // TODO: Must not be resolve here. The boostrap component will not be a subcomponent
                // Must be resolved in ComponentActivator or a new specialized class.
                // const config = resolveConfig(input);
    
                const childContainer = new ComponentContainer(subComponentMetadata.componentType, container);
                childContainer.bindInput(input);
                //childContainer.bindConfig(config);

                componentActivator.init(childContainer);
            }
        }

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}