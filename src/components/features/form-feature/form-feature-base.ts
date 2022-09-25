import { ExternalArgs, FieldType, FormConfig, FormEventArg, FormFeature, MnContext, PropertyTypeReplacer, RecursiveNoUndefined } from "../../../typing";
import { XrmMapper } from "./config-helper/xrm-mapper";
import { FeatureBase } from "../feature-base";
import { checkFormConfiguration, getFormContext, isNullOrUndefined } from "../../../utils";

export type FieldTypeReplacer<TFields extends Record<string, unknown>> = PropertyTypeReplacer<TFields, FieldType>;

export type FieldsMetadataFromConfig<TConfig extends FormConfig> = FieldTypeReplacer<RecursiveNoUndefined<TConfig["fields"]>>;

/** Feature associated with a Dynamics / Dataverse form .
 * TConfig defines the feature configuration.
 * */
export abstract class FormFeatureBase
    <
        TConfig extends FormConfig = FormConfig,
        TFieldMetaData extends Readonly<FieldsMetadataFromConfig<TConfig>> = FieldsMetadataFromConfig<TConfig>
    >
    extends FeatureBase<TConfig> implements FormFeature<TConfig> {

    private fieldsMetadata?: TFieldMetaData;

    constructor(config: TConfig, fieldsMetadata?: TFieldMetaData) {
        super(config);
        this.fieldsMetadata = fieldsMetadata;
    }

    public onInit(context: MnContext, extArgs: ExternalArgs): void {
        const formCtx = getFormContext(extArgs.primaryArgument as Xrm.Events.EventContext);
        if (isNullOrUndefined(formCtx) == false) {
            // Checking the configuration only on form context
            this.checkConfiguration(formCtx as Xrm.FormContext);
        }

        super.onInit(context, extArgs);
    }

    /** Check the feature configuration */
    protected checkConfiguration(formCtx: Xrm.FormContext): void {
        checkFormConfiguration(formCtx, this.config, this.fieldsMetadata);
    }

    /**
     * Creates a mapper to access fields, controls, values and tabs
     * by their name as indicated in the configuration.
     * @param eventArg
     */
    // TODO: Replace with a service
    protected newMapper(eventArg: FormEventArg): XrmMapper<TConfig, TFieldMetaData> {
        return new XrmMapper<TConfig, TFieldMetaData>(eventArg, this.config);
    }
}
