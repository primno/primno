import { Configuration } from "../configuration";

export interface ConfigAdapter {
    getConfig(): Promise<Configuration>
}
