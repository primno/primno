import { optional } from "inversify";

/**
 * Decorator that marks an optional dependency.
 * Null will be injected if the dependency is not found.
 * 
 * @example Mark `MyService` as an optional dependency.
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record"
 *    }
 * })
 * export class MyComponent {
 *    // Search for a dependency with the identifier "ServiceIdentifier" and inject it into this property.
 *    // If the dependency is not found, null will be injected.
 *    @Optional()
 *    @Inject("ServiceIdentifier")
 *    myService: Service;
 * }
 * ```
 * 
 * @category Dependency Injection
 */
export function Optional() {
    return optional();
}