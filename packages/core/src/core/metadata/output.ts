/**
 * Decorator that mark a property as output (EventEmiiter).
 * @returns 
 */
 export function MnOutput() {
    return (t: any, k?: any, i?: any) => {};
    //return Inject("output");
}