import { Domain, Module } from "../../typing";
import { DecoratorTypes } from "../../metadata";

// TODO: Review

/**
 * Type of domain (decorated by MnDomain) used to create an instance of a domain inheriting from OnDomainInit 
 */
export type DomainType = { new(): Domain };

/**
 * Finds all domains in an ECMAScript module.
 * @param esm ECMAScript module
 */
export function findDomains(esm: Module): DomainType[] {
    const domains = [];

    for (const propName in esm) {
        const domain = esm[propName];
        if (Reflect.get(domain, DecoratorTypes.Domain) === true) {
            domains.push(domain);
        }
    }

    return domains;
}
