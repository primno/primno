import { StringPropertyObject } from "./common";
import { Component, ComponentConfig } from "./component";

//export type FieldType = "lookup" | "string" | "number" | "optionset" | "boolean" | "datetime";
export const enum FieldType {
    boolean = "boolean",
    string = "string",
    datetime = "dateTime",
    lookup = "lookup",
    optionset = "optionSet",
    number = "number"
}

export type FieldTypePropertyObject = { [key: string]: FieldType | undefined };

// TODO: Do not mix what is "core" and what is "sdk"
// FormConfig is for example linked to the sdk, to the fields checking, but not to the core. 

export type FeatureConfig = ComponentConfig;

/** Describes the configuration required for a forms-based feature. */
export interface FormConfig extends FeatureConfig {
    fields?: StringPropertyObject;
    tabs?: StringPropertyObject;
}

export interface GridConfig extends FeatureConfig {
    buttons?: StringPropertyObject;
    enableRules?: StringPropertyObject;
}

// Feature

export type Feature<TConfig extends FeatureConfig = FeatureConfig> = Component<TConfig>;
export type FormFeature<TConfig extends FormConfig = FormConfig> = Feature<TConfig>;
export type GridFeature<TConfig extends GridConfig = GridConfig> = Feature<TConfig>;