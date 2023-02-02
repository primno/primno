import { injectable } from "inversify";

/**
 * Decorator that marks a class providable as a depencency.
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
 *       pageType: PageType.record
 *    }
 * })
 * export class MyComponent {
 *    myService: MyService;
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