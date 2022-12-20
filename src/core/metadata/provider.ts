import { Constructor } from "../../typing";

export interface ClassProvider {
    provide: any;
    useClass: Constructor;
}

export interface ValueProvider {
    provide: any;
    useValue: any;
}

export interface FactoryProvider {
    provide: any;
    useFactory: FunctionConstructor;
}

export type ProviderConfig = ClassProvider | ValueProvider | FactoryProvider | any;

export interface Provider {
    providers?: ProviderConfig[];
}