import { Constructor } from "../../typing";

export interface ClassProvider {
    /**
     * Token to which the `useClass` will be bound.
     */
    provide: any;
    /**
     * Class to instantiate for the `provide` token.
     */
    useClass: Constructor;
}

export interface ValueProvider {
    /**
     * Token to which the `useValue` will be bound.
     */
    provide: any;
    /** Value to inject for the `provide` token. */
    useValue: any;
}

export interface FactoryProvider {
    /** Token to which the `useFactory` will be bound. */
    provide: any;
    /** Factory function to invoke to create the value for the `provide` token. */
    useFactory: FunctionConstructor;
}

/**
 * Type of the `providers` array in {@link ModuleConfig} or {@link ComponentConfig}.
 */
export type ProviderConfig = ClassProvider | ValueProvider | FactoryProvider | any;

/**
 * Interface for the `providers` array in {@link ModuleConfig} or {@link ComponentConfig}.
 */
export interface Provider {
    /**
     * Configure the injector to return a value for a token.
     */
    providers?: ProviderConfig[];
}