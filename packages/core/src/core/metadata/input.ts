import { Inject } from "../di/inject";

/**
 * Decorator that mark a property of a component as input.
 * 
 * The input property name must be `input`. An other property name is not supported.
 * The `Input` interface contains this constraint.
 * It is recommended to inherit from it when you need to define an input in your component.
 * 
 * The input property will be set by the value given by the parent component.
 * See {@link MnSubComponent} for more information about transmission of the input from a parent component to its sub component.
 * 
 * @example A parent component send an input (10, "hello") to its sub component.
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: PageType.record
 *    }
 * })
 * class ParentComponent {
 *    @MnSubComponent({
 *       component: ChildComponent,
 *       input: {
 *          value1: 10,
 *          value2: "hello"
 *       }
 *    })
 *    child: SubComponent<ChildComponent>;
 * }
 * 
 * @MnComponent({
 *    scope: {
 *       pageType: PageType.record
 *    }
 * })
 * class ChildComponent implements Input {
 *    @MnInput()
 *    input: {
 *        value1: number;
 *        value2: string;
 *    };
 * }
 * ```
 * @category Component
 */
 export function MnInput() {
    return Inject("input");
}