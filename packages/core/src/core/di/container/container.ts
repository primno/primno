import { Container as InvContainer, interfaces as InvInterfaces } from "inversify";
import { ComponentConstructor } from "../../../typing/component";
import { isComponent } from "../../metadata/helper";
import { Bind } from "./bind";
import { warning } from "../../../utils";

export interface Middleware {
    /**
     * If true, the middleware will be inherited by child containers.
     */
    inherit: boolean;

    /**
     * Called before the construction of an instance.
     */
    onPreConstruct(identifier: any, container: Container, key?: string | symbol | number): void;

    /**
     * Called after the construction of an instance.
     */
    onPostConstruct(instance: unknown, container: Container): unknown;

    /**
     * Called when an error is thrown during the construction of an instance.
     */
    onError(errorMsg: string): void;
}

// TODO: Create middleware for decorator ?

function convertToInvMiddleware(middleware: Middleware, container: Container): InvInterfaces.Middleware {
    return (planAndResolve: InvInterfaces.Next) => {
        return (args: InvInterfaces.NextArgs<unknown>) => {
            let instance;

            try {
                middleware.onPreConstruct(args.serviceIdentifier, container, args.key);
                instance = planAndResolve(args);
                instance = middleware.onPostConstruct(instance, container);
            }
            catch (except: any) {
                middleware.onError(except.message);
            }
            return instance;
        };
    };
}

/**
 * Container for dependency injection.
 */
export class Container {
    protected children: Container[] = [];
    protected invContainer: InvContainer;
    protected middleware: Middleware[] = [];

    public constructor(parentContainer?: Container) {
        if (parentContainer) {
            parentContainer.children.push(this);
            this.invContainer = parentContainer.invContainer.createChild();
            this.addMiddleware(...parentContainer.middleware.filter(m => m.inherit));
        }
        else {
            this.invContainer = new InvContainer({ autoBindInjectable: false });
        }
    }

    /**
     * Middleware will be executed left to right.
     * @param middleware Middleware
     */
    public addMiddleware(...middleware: Middleware[]) {
        this.middleware.push(...middleware);

        const inheritMiddleware = middleware.filter(m => m.inherit);
        this.children.forEach(c => c.addMiddleware(...inheritMiddleware));

        const invMiddleware = this.middleware.map(m => convertToInvMiddleware(m, this));
        // Reverse because Inversify execute right to left
        this.invContainer.applyMiddleware(...invMiddleware.reverse());
    }

    public bind(bind: Bind) {
        switch(bind.type) {
            case "class":
                return this.bindClass(bind.token, bind.use);
            case "factory":
                return this.bindDynamicValue(bind.token, bind.use);
            case "value":
                return this.bindConstantValue(bind.token, bind.use);
        }
    }

    public bindComponent(componentType: ComponentConstructor) {
        this.invContainer
            .bind(componentType)
            .toSelf()
            .inRequestScope()
            .when(request => isComponent(request.serviceIdentifier as ComponentConstructor));
    }

    public bindClass(provider: any, value: any) {
        if (this.isBound(provider)) {
            warning(`Class provider ${provider} is already bound.`);
            return;
        }

        this.invContainer
            .bind(provider)
            .to(value)
            .inSingletonScope();
    }

    public bindConstantValue(provider: any, value: any) {
        if (this.isBound(provider)) {
            warning(`Constant provider ${provider} is already bound.`);
            return;
        }

        this.invContainer
            .bind(provider)
            .toConstantValue(value)
            // TODO: Too specific, provide filter like inversify ?
            .when(request => isComponent(request?.parentRequest?.serviceIdentifier as ComponentConstructor));
    }

    public bindDynamicValue(provider: any, dynValResolver: (target: any) => any) {
        if (this.isBound(provider)) {
            warning(`Dynamics value provider ${provider} is already bound.`);
            return;
        }

        this.invContainer
            .bind(provider)
            .toDynamicValue(dynValResolver)
            .when(request => isComponent(request?.parentRequest?.serviceIdentifier as ComponentConstructor));
    }

    public createChild(): Container {
        return new Container(this);
    }

    public isBound(serviceIdentifier: any): boolean {
        return this.invContainer.isCurrentBound(serviceIdentifier);
    }

    public get(serviceIdentifier: any) {
        return this.invContainer.get(serviceIdentifier);
    }
}
