/**
 * Décorateur marquant cette propriété comme un output (event emitter).
 * @returns 
 */
 export function MnOutput() {
    return (t: any, k?: any, i?: any) => {};
    //return Inject("output");
}