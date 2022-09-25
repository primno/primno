import { Component, Domain, Esm } from "../../typing";
import { debug, isNullOrUndefined } from "../../utils";
import { DomainScope } from "./domain-scope";
import { DomainType, findDomains } from "./loader";

interface DomainTypeInfo {
    domainType: DomainType;
    domainBrowser?: DomainBrowser;
}

export class DomainBrowser {
    private _components: Component[];

    public constructor(private domain: Domain) {
        this._components = domain.components;
    }

    public get components(): Component[] {
        return this._components;
    }
}

export class DomainLoader {
    private domainsTypeState: DomainTypeInfo[] = [];

    public constructor(private esm: Esm) {
        this.domainsTypeState = findDomains(esm).map(dt => ({ domainType: dt }));
    }

    public getDomains(controlScope: DomainScope): DomainBrowser[] {
        const relatedDomains = this.domainsTypeState
            .filter(dt => new DomainScope(dt.domainType).isInScope(controlScope));

        for (const d of relatedDomains) {
            if (isNullOrUndefined(d.domainBrowser)) {
                debug(`Creating DomainBrowser for ${controlScope}`);
                d.domainBrowser = new DomainBrowser(new d.domainType());
            }
        }

        return relatedDomains.map(dt => dt.domainBrowser as DomainBrowser);
    }

    // // TODO: Need primno instance or switch primno to singleton
    // public static getDomains(primno: Primno) {

    // }

    // //TODO: Need primary arg, save him on init ?
    // public static clearDomain() {

    // }
}