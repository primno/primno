import { FeatureConfig } from "../../typing";
import { ComponentBase } from "../component-base";

export abstract class FeatureBase<TConfig extends FeatureConfig = FeatureConfig> extends ComponentBase<TConfig> {
    /**
     * Construct the feature from provided config.
     * @param config Feature configuration.
     */
    constructor(config: TConfig) {
        super(config);
    }
}