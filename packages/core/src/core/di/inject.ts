import { inject } from "inversify";

/**
 * Decorator on a dependency that specifies the identifier for that depencency.
 * @category Dependency Injection
 * @param serviceIdentifier Identifier of the dependency.
 * @returns 
 */
export function Inject(serviceIdentifier: any) {
    return inject(serviceIdentifier);
}