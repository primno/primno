import { Esm } from "../../typing";

/**
 * Used to obtain the js module.
 * The module contains the domains.
 */
export interface EsmResolver {
    resolve(): Promise<Esm>;
}
