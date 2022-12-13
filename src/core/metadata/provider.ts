export interface ProviderConfig {
    provide: any;
    useClass: any;
}

export interface Provider {
    // Service ?
    providers?: ProviderConfig[];
}