import { ComponentConstructor, Component } from "../../../typing";
import { verbose } from "../../../utils";
import { ComponentActivator } from "../../component/component-activator";
import { ComponentBrowser } from "../../component/component-browser";
import { ComponentLifeCycle } from "../../component/component-lifecycle";
import { isComponent } from "../../metadata/helper";
import { Container, Middleware } from "../container/container";

/**
 * Create the ComponentActivator for each sub components of a component.
 * Prepare the subcomponent to be enabled/disabled with his container.
 */
export class SubComponentMiddleware implements Middleware {
    get inherit(): boolean {
        return true;
    }

    public constructor(private componentLifeCycle: ComponentLifeCycle) {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onPreConstruct(): void {}

    onPostConstruct(instance: Component, container: Container): Component {
        if (!isComponent(instance)) {
            return instance;
        }

        const componentBrowser = new ComponentBrowser(instance, instance.input);
        componentBrowser.subComponents
            .forEach(c => {
                verbose(`Subcomponent ${c.name} find in ${componentBrowser.name} for ${c.keyName} property.`);

                const componentActivator = new ComponentActivator(
                    c.componentType as ComponentConstructor,
                    this.componentLifeCycle,
                    container,
                    c.input
                );

                // TODO: Replace with proxy to component activator
                instance[c.keyName as string] = componentActivator;

                if (c.defaultEnabled) {
                    componentActivator.enable();
                }
            });

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(errorMsg);
    }
}