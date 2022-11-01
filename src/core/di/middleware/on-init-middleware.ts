import { ComponentObject } from "../../../typing";
import { isComponent } from "../../metadata/helper";
import { Middleware } from "../container/container";

/**
 * Trigger the mnOnInit event on the components.
 * Must be the first middleware to ensure
 * that mnOnInit will be trigger in the right order (parent to children).
 */
export class OnInitMiddleWare implements Middleware {
    private componentsConstructed: ComponentObject[] = [];
    private counter = 0;

    public get inherit() {
        return true;
    }

    onPreConstruct(identifier: any, key?: string | number | symbol | undefined): void {
        if (isComponent(identifier)) {
            ++this.counter;
        }
    }

    onPostConstruct(instance: ComponentObject): unknown {
        if (isComponent(instance)) {
            this.componentsConstructed.push(instance);

            if (--this.counter === 0) {
                const components = [...this.componentsConstructed];
                
                // Reset
                this.componentsConstructed.splice(0);

                components
                    .reverse()
                    .forEach(c => {
                        if (c.mnOnInit) {
                            c.mnOnInit();
                        }
                });
            }
        }

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(`An error was occured in OnInitMiddleware: ${errorMsg}`);
    }
}