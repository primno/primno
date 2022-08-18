import { CanBePromise, ExternalArgs } from "../../typing";
import { getControlType, isNullOrUndefined } from "../../utils";
import { Context } from "./context";
import { EventEnv } from "../events/event-env";
import { ModuleLoader } from "../module/module-loader";
import { InitializeOptions } from "../primno";

/**
 * Creates or gives the execution context of Primno for a given D365 event.
 */
export class ContextInitializer {
    private contexts: Record<string, CanBePromise<Context>> = {};
    private moduleLoader: ModuleLoader;

    public constructor(initOptions: InitializeOptions,
        private eventEnv: EventEnv)
    {
        this.moduleLoader = new ModuleLoader(initOptions);
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
            this.contexts[controlType] = Context.new(extArgs, this.eventEnv, this.moduleLoader);
            return this.contexts[controlType] = await this.contexts[controlType];
        })();
    }
}