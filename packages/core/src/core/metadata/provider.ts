import { Constructor } from "../../typing";

/**
 * Provider configuration for a class.
 * @category Dependency Injection
 */
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

/**
 * Provider configuration for a value.
 * @category Dependency Injection
 */
export interface ValueProvider {
    /**
     * Token to which the `useValue` will be bound.
     */
    provide: any;
    /** Value to inject for the `provide` token. */
    useValue: any;
}

/**
 * Provider configuration for a factory function.
 * @category Dependency Injection
 */
export interface FactoryProvider {
    /** Token to which the `useFactory` will be bound. */
    provide: any;
    /** Factory function to invoke to create the value for the `provide` token. */
    useFactory: FunctionConstructor;
}

/**
 * Type of a class to provide.
 */
export type TypeProvider = Constructor;

/**
 * Type of the `providers` array in {@link ModuleConfig} or {@link ComponentConfig}.
 * @category Dependency Injection
 */
export type ProviderConfig = TypeProvider | ClassProvider | ValueProvider | FactoryProvider;

/**
 * Interface for the `providers` array in {@link ModuleConfig} or {@link ComponentConfig}.
 * @category Dependency Injection
 */
export interface Provider {
    /**
     * Configure the injector to return a value for a token.
     */
    providers?: ProviderConfig[];
}