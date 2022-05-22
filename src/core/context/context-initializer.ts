import { CanBePromise, ExternalArgs } from "../../typing";
import { getControlType, isNullOrUndefined } from "../../utils";
import { Configuration } from "../configuration";
import { Context } from "./context";
import { EventEnv } from "../events/event-env";
import { ModuleLoader } from "../module/module-loader";

/**
 * Creates or gives the execution context of Primno associated with the main control of the event 
 */
export class ContextInitializer {
    private contexts: Record<string, CanBePromise<Context>> = {};
    private moduleRegister: ModuleLoader;

    public constructor(config: Configuration,
        private eventEnv: EventEnv)
    {
        this.moduleRegister = new ModuleLoader(config.moduleResolverConfig);
    }

    /**
     * Creates or gets the context associated with the dataverse event. 
     * Create a context by control type.
     * @param extArgs 
     * @returns 
     */
    public getContext(extArgs: ExternalArgs): CanBePromise<Context> {
        const controlType = getControlType(extArgs.primaryArgument);

        if (isNullOrUndefined(controlType)) {
            throw new Error("Unknow event type flow");
        }

        if (!isNullOrUndefined(this.contexts[controlType])) {
            return this.contexts[controlType];
        }

        return (async () => {
            // HACK : Attempt to return a promise during initialization if another call to the same context occurs during asynchronous init. 
            this.contexts[controlType] = Context.new(extArgs, this.eventEnv, this.moduleRegister);
            this.contexts[controlType] = await this.contexts[controlType];

            return this.contexts[controlType];
        })();
    }
}