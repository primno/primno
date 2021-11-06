import { GridConfig, GridFeature } from "../../../typing";
import { FeatureBase } from "../feature-base";

/** Feature associated with a grid or home view of Dynamics / Dataverse.
 * TConfig defines the feature configuration.
 * */
export abstract class GridFeatureBase<TConfig extends GridConfig = GridConfig> extends FeatureBase<TConfig> implements GridFeature<TConfig> {}