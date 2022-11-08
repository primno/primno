import { Container as InvContainer, interfaces as InvInterfaces } from "inversify";
import { ComponentConstructor } from "../../../typing/component";
import { isComponent } from "../../metadata/helper";

export interface Middleware {
    inherit: boolean;
    onPreConstruct(identifier: any, key?: string | symbol | number): void;
    onPostConstruct(instance: unknown, container: Container): unknown;
    onError(errorMsg: string): void;
}

// TODO: Create middleware for decorator ?

function convertToInvMiddleware(middleware: Middleware, container: Container): InvInterfaces.Middleware {
    return (planAndResolve: InvInterfaces.Next) => {
        return (args: InvInterfaces.NextArgs<unknown>) => {
            let instance;

            try {
                middleware.onPreConstruct(args.serviceIdentifier, args.key);
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
    protected middlewares: Middleware[] = [];

    public constructor(parentContainer?: Container) {
        if (parentContainer) {
            parentContainer.children.push(this);
            this.invContainer = parentContainer.invContainer.createChild();
            this.addMiddlewares(...parentContainer.middlewares.filter(m => m.inherit));
        }
        else {
            this.invContainer = new InvContainer({ autoBindInjectable: false });
        }
    }

    /**
     * Middlewares will be executed left to right.
     * @param middlewares Middleware
     */
    public addMiddlewares(...middlewares: Middleware[]) {
        this.middlewares.push(...middlewares);

        const inheritMiddlewares = middlewares.filter(m => m.inherit);
        this.children.forEach(c => c.addMiddlewares(...inheritMiddlewares));

        const invMiddlewares = this.middlewares.map(m => convertToInvMiddleware(m, this));
        // Reverse because Inversify execute right to left
        this.invContainer.applyMiddleware(...invMiddlewares.reverse());
    }

    public bindComponent(componentType: ComponentConstructor) {
        this.invContainer
            .bind(componentType)
            .toSelf()
            .inRequestScope()
            .when(request => isComponent(request.serviceIdentifier as ComponentConstructor));
    }

    public bindService(provider: any, value: any) {
        this.invContainer
            .bind(provider)
            .to(value)
            .inSingletonScope();
    }

    public bindConstantValue(provider: any, value: any) {
        this.invContainer
            .bind(provider)
            .toConstantValue(value)
            // TODO: Too specific, provide filter like inversify ?
            .when(request => isComponent(request?.parentRequest?.serviceIdentifier as ComponentConstructor));
    }

    public bindDynamicValue(provider: any, dynValResolver: (target: any) => any) {
        this.invContainer
            .bind(provider)
            .toDynamicValue(dynValResolver)
            .when(request => isComponent(request?.parentRequest?.serviceIdentifier as ComponentConstructor));
    }

    public createChild(): Container {
        return new Container(this);
    }

    public get(serviceIdentifier: any) {
        return this.invContainer.get(serviceIdentifier);
    }
}
