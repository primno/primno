import { StringPropertyObject } from "./common";
import { ComponentConfig } from "./component";

/**
 * @ignore
 */
export const enum ColumnType {
    boolean = "boolean",
    string = "string",
    datetime = "dateTime",
    lookup = "lookup",
    optionset = "optionSet",
    number = "number"
}

/**
 * @ignore
 */
export type ColumnTypePropertyObject = { [key: string]: ColumnType | undefined };

// TODO: Do not mix what is "core" and what is "sdk"
// FormConfig is for example linked to the sdk, to the columns checking, but not to the core. 

/**
 * @ignore
 */
export type FeatureConfig = ComponentConfig;

/** Describes the configuration required for a forms-based feature.
 * @ignore
 */
export interface FormConfig extends FeatureConfig {
    columns?: StringPropertyObject;
    tabs?: StringPropertyObject;
}
