import { Scope } from "../../typing";
import { ScopeBase } from "../common/scope/scope-base";
import { DomainType } from "./loader";

export class DomainScope extends ScopeBase {
    public constructor(domainType: DomainType) {
        const scope = Reflect.get(domainType, "scope") as Scope;

        super(scope.entityName);
        this.form = scope.form;
        this.app = scope.app;
    }
}
