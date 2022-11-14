import { Scope } from "../../typing";
import { ScopeBase } from "./scope-base";

export class ComponentScope extends ScopeBase {
    public constructor(scope: Scope) {
        super(scope);
    }
}