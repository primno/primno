/**
 * Decorator that mark a property as output (EventEmiter).
 * @category Component
 * @ignore
 */
 export function MnOutput() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return (t: any, k?: any, i?: any) => {};
    //return Inject("output");
}