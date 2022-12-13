import { EsmResolver } from "./esm-resolver";
import { Esm } from "../../typing";

export class EmbeddedEsmResolver implements EsmResolver {
    constructor(private esm: Esm) {}

    public resolve() {
        return this.esm;
    }
}