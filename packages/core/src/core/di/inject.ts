import { inject } from "inversify";

/**
 * Decorator on a dependency that specifies the identifier for that dependency.
 * 
 * @example Inject `MyService` into `MyComponent` using the identifier (token) "ServiceIdentifier".
 * ```ts
 * interface Service {
 *    doSomething(): void;
 * }
 * 
 * @Injectable()
 * class MyService implements Service {
 *    doSomething() {
 *       console.log("Hello World!");
 *    }
 * }
 * 
 * @MnComponent({
 *    providers: [
 *       { provide: "ServiceIdentifier", useClass: MyService }
 *    ]
 * })
 * export class MyComponent {
 *    // Search for a dependency with the identifier "ServiceIdentifier" and inject it into this property.
 *    @Inject("ServiceIdentifier")
 *    myService: Service;
 * }
 * ```
 * 
 * @category Dependency Injection
 * @param serviceIdentifier Identifier of the dependency.
 * @returns 
 */
export function Inject(serviceIdentifier: any) {
    return inject(serviceIdentifier);
}