import { Domain, Module } from "../../typing";
import { DecoratorTypes } from "../../metadata";
import { hasMetadata } from "../../utils/metadata";

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
    const domainTypes: DomainType[] = [];

    for (const propName in esm) {
        const domainType = esm[propName];
        if (hasMetadata(DecoratorTypes.Domain, domainType)) {
            domainTypes.push(domainType);
        }
    }

    return domainTypes;
}
