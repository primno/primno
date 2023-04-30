import { decorate, injectable } from "inversify";
import { Constructor } from "../../typing";
import { addProvider } from "./container/root-provider";

/**
 * Options for the `Injectable` decorator.
 */
interface InjectableOptions {
    /**
     * Determines where the dependency is provided.
     */
    providedIn?: "root";
}

/**
 * Decorator that marks a class providable as a dependency.
 * 
 * @example Mark `MyService` as a dependency.
 * ```ts
 * @Injectable()
 * class MyService {
 *   doSomething() {
 *     console.log("Hello World!");
 *   }
 * }
 * 
 * @MnComponent({
 *    scope: {
 *       pageType: "record"
 *    },
 *    providers: [
 *       MyService
 *    ]
 * })
 * export class MyComponent {
 *   constructor(myService: MyService) {
 *     myService.doSomething();
 *   }
 * }
 * 
 * ```
 * 
 * @category Dependency Injection
 * @returns 
 */
export function Injectable<T extends Constructor>(options?: InjectableOptions) {
    return function (target: T) {
        decorate(injectable(), target);

        if (options?.providedIn === "root") {
            addProvider(target);
        }
    }
}