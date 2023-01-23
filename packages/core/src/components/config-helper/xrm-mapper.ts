import { ColumnType, FormConfig, FormEventArg, PropertyTypeReplacer, RecursiveNoUndefined } from "../../typing";
import { XrmControlHandler, XrmColumnHandler, XrmTabHandler, XrmValueHandler } from "./xrm-handlers";

type ColumnTypeToXrmAttribute<T extends ColumnType> = 
    T extends ColumnType.boolean ? Xrm.Attributes.BooleanAttribute :
    T extends ColumnType.string ? Xrm.Attributes.StringAttribute :
    T extends ColumnType.datetime ? Xrm.Attributes.DateAttribute :
    T extends ColumnType.lookup ? Xrm.Attributes.LookupAttribute :
    T extends ColumnType.optionset ? Xrm.Attributes.OptionSetAttribute :
    T extends ColumnType.number ? Xrm.Attributes.NumberAttribute :
    Xrm.Attributes.Attribute;

type ColumnTypeToXrmControl<T extends ColumnType> = 
    T extends ColumnType.boolean ? Xrm.Controls.OptionSetControl :
    T extends ColumnType.string ? Xrm.Controls.StringControl :
    T extends ColumnType.datetime ? Xrm.Controls.DateControl :
    T extends ColumnType.lookup ? Xrm.Controls.LookupControl :
    T extends ColumnType.optionset ? Xrm.Controls.OptionSetControl :
    T extends ColumnType.number ? Xrm.Controls.NumberControl :
    Xrm.Controls.Control;

type ExtractAttributeTypeValue<T extends Xrm.Attributes.Attribute> = ReturnType<T["getValue"]>;

type ColumnTypeMetadata = Record<string, ColumnType>;

type Columns<T extends ColumnTypeMetadata> = { [P in keyof T]: ColumnTypeToXrmAttribute<T[P]>};
type Controls<T extends ColumnTypeMetadata> = { [P in keyof T]: ColumnTypeToXrmControl<T[P]>};
type Values<T extends ColumnTypeMetadata> = { [P in keyof T]: ExtractAttributeTypeValue<ColumnTypeToXrmAttribute<T[P]>>};

type Tabs<TConfig extends FormConfig> = { [P in keyof TConfig['tabs']]: Xrm.Controls.Tab };

export type ColumnTypeReplacer<TColumns extends Record<string, unknown>> = PropertyTypeReplacer<TColumns, ColumnType>;
export type ColumnsMetadataFromConfig<TConfig extends FormConfig> = ColumnTypeReplacer<RecursiveNoUndefined<TConfig["columns"]>>;

/** Provides the tools allowing direct access to the columns, controls, values and tab of the form from the configuration  */
export class XrmMapper<TConfig extends FormConfig, TColumnMetaData extends ColumnsMetadataFromConfig<TConfig>> {
    constructor(eventArg: FormEventArg, config: TConfig) {
        if (config.columns != null) {
            const configColumns = config.columns as NonNullable<TConfig["columns"]>;
            this.columns = new Proxy<NonNullable<TConfig["columns"]>>(configColumns, new XrmColumnHandler(eventArg.formCtx)) as never;
            this.controls = new Proxy<NonNullable<TConfig["columns"]>>(configColumns, new XrmControlHandler(eventArg.formCtx)) as never;
            this.values = new Proxy<NonNullable<TConfig["columns"]>>(configColumns, new XrmValueHandler(eventArg.formCtx)) as never;
        }
        else {
            this.columns = {} as never;
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

    public columns: Columns<TColumnMetaData>;
    public controls: Controls<TColumnMetaData>;
    public values: Values<TColumnMetaData>;

    public tabs: Tabs<TConfig>;
}
