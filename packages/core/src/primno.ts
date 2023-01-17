export * from './typing';

// For @primno/cli
export { Configuration } from "./core/configuration";

export {
    Inject,
    Injectable,
    Optional
} from "./core/di";

export {
    MnComponent,
    MnInput,
    MnModule,
    MnOutput,
    MnSubComponent,
    MnConfig
} from "./core/metadata"

// MnOnFormLoad, MnOnFieldChange, etc.
export * from "./core/metadata/events";

export {
    Config,
    Input,
    OnDestroy,
    OnInit
} from "./core/component/interface";

export {
    SubComponent
} from "./core/component/component-activator";