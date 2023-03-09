import { injectable } from "inversify";

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
 *   scope: {
 *     pageType: "record"
 *     },
 *     providers: [
 *       MyService
 *   ]
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
export function Injectable() {
    return injectable();
}