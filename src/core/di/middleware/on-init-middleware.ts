import { ComponentObject } from "../../../typing";
import { isComponent } from "../../metadata/helper";
import { Middleware } from "../container/container";

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
                this.componentsConstructed.forEach(c => {
                    if (c.mnOnInit) {
                        c.mnOnInit();
                    }
                })
            }

            // Reset
            this.componentsConstructed.splice(0);
        }

        return instance;
    }

    onError(errorMsg: string): void {
        throw new Error(`An error was occured in OnInitMiddleware: ${errorMsg}`);
    }
}