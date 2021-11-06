import { Domain, Component } from "../typing";
import { FluentDomainInitializer } from "./fluent-domain-initializer";

/**
 * Provides a Fluent API to register features.
 */
export abstract class DomainBase implements Domain {
    public get components(): Component[] {
        const domainInit = new FluentDomainInitializer();
        this.onComponentRegister(domainInit);
        return domainInit.components;
    }

    protected abstract onComponentRegister(domainInitializer: FluentDomainInitializer): void;
}
