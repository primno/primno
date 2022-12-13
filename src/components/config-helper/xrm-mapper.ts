import { FieldType, FormConfig, FormEventArg, PropertyTypeReplacer, RecursiveNoUndefined } from "../../typing";
import { XrmControlHandler, XrmFieldHandler, XrmTabHandler, XrmValueHandler } from "./xrm-handlers";

type FieldTypeToXrmAttribute<T extends FieldType> = 
    T extends FieldType.boolean ? Xrm.Attributes.BooleanAttribute :
    T extends FieldType.string ? Xrm.Attributes.StringAttribute :
    T extends FieldType.datetime ? Xrm.Attributes.DateAttribute :
    T extends FieldType.lookup ? Xrm.Attributes.LookupAttribute :
    T extends FieldType.optionset ? Xrm.Attributes.OptionSetAttribute :
    T extends FieldType.number ? Xrm.Attributes.NumberAttribute :
    Xrm.Attributes.Attribute;

type FieldTypeToXrmControl<T extends FieldType> = 
    T extends FieldType.boolean ? Xrm.Controls.OptionSetControl :
    T extends FieldType.string ? Xrm.Controls.StringControl :
    T extends FieldType.datetime ? Xrm.Controls.DateControl :
    T extends FieldType.lookup ? Xrm.Controls.LookupControl :
    T extends FieldType.optionset ? Xrm.Controls.OptionSetControl :
    T extends FieldType.number ? Xrm.Controls.NumberControl :
    Xrm.Controls.Control;

type ExtractAttributeTypeValue<T extends Xrm.Attributes.Attribute> = ReturnType<T["getValue"]>;

type FieldTypeMetadata = Record<string, FieldType>;

type Fields<T extends FieldTypeMetadata> = { [P in keyof T]: FieldTypeToXrmAttribute<T[P]>};
type Controls<T extends FieldTypeMetadata> = { [P in keyof T]: FieldTypeToXrmControl<T[P]>};
type Values<T extends FieldTypeMetadata> = { [P in keyof T]: ExtractAttributeTypeValue<FieldTypeToXrmAttribute<T[P]>>};

type Tabs<TConfig extends FormConfig> = { [P in keyof TConfig['tabs']]: Xrm.Controls.Tab };

export type FieldTypeReplacer<TFields extends Record<string, unknown>> = PropertyTypeReplacer<TFields, FieldType>;
export type FieldsMetadataFromConfig<TConfig extends FormConfig> = FieldTypeReplacer<RecursiveNoUndefined<TConfig["fields"]>>;

/** Provides the tools allowing direct access to the fields, controls, values and tab of the form from the configuration  */
export class XrmMapper<TConfig extends FormConfig, TFieldMetaData extends FieldsMetadataFromConfig<TConfig>> {
    constructor(eventArg: FormEventArg, config: TConfig) {
        if (config.fields != null) {
            const configFields = config.fields as NonNullable<TConfig["fields"]>;
            this.fields = new Proxy<NonNullable<TConfig["fields"]>>(configFields, new XrmFieldHandler(eventArg.formCtx)) as never;
            this.controls = new Proxy<NonNullable<TConfig["fields"]>>(configFields, new XrmControlHandler(eventArg.formCtx)) as never;
            this.values = new Proxy<NonNullable<TConfig["fields"]>>(configFields, new XrmValueHandler(eventArg.formCtx)) as never;
        }
        else {
            this.fields = {} as never;
            this.controls = {} as never;
            this.values = {} as never;
        }

        if (config.tabs != null) {
            const configTabs = config.tabs as NonNullable<TConfig["tabs"]>;
            this.tabs = new Proxy<NonNullable<TConfig["tabs"]>>(configTabs, new XrmTabHandler(eventArg.formCtx)) as never;
        }
        else {
            this.tabs = {} as never;
        }
    }

    public fields: Fields<TFieldMetaData>;
    public controls: Controls<TFieldMetaData>;
    public values: Values<TFieldMetaData>;

    public tabs: Tabs<TConfig>;
}
