import { MnContext } from '.';
import { ExternalArgs } from './events';

// Component configuration
export type ComponentConfig = Record<string, unknown>;
export type ComponentType = new (...args: unknown[]) => unknown;

export interface Component<TConfig extends ComponentConfig = ComponentConfig> {
    readonly config: Readonly<TConfig>;
    readonly name: string;

    onInit(context: MnContext, extArgs: ExternalArgs): void;
}
