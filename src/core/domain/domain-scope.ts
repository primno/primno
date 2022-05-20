import { DecoratorTypes, DomainMetadata } from "../../metadata";
import { getMetadata } from "../../utils/metadata";
import { ScopeBase } from "../common/scope/scope-base";
import { DomainType } from "./loader";

export class DomainScope extends ScopeBase {
    public constructor(domainType: DomainType) {
        // TODO: Make a domain metadata helper ?
        const { scope } = getMetadata<DomainMetadata>(DecoratorTypes.Domain, domainType);

        super(scope.entityName);
        this.form = scope.form;
        this.app = scope.app;
    }
}
