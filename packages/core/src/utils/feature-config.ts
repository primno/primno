import { ColumnType, ColumnTypePropertyObject, FormConfig, StringPropertyObject } from "../typing";
import { isNullOrEmpty } from "./common";

/**
 * Converts Dataverse column type to Primno column type.
 * @param xrmAttributeType 
 * @returns 
 */
function convertToColumnType(xrmAttributeType: Xrm.Attributes.AttributeType): ColumnType {
    switch (xrmAttributeType){
        case "boolean": return ColumnType.boolean;
        case "datetime": return ColumnType.datetime;
        case "decimal":
        case "double":   
        case "integer": return ColumnType.number;
        case "lookup":  return ColumnType.lookup;
        case "memo": 
        case "string": return ColumnType.string;
        case "money": return ColumnType.number;
        case "optionset": return ColumnType.optionset;
        default: throw new Error("Unknow column type");
    }
}

/**
 * Checks the consistency of a column configuration. Check column types if columnMetadata is given.
 * @param formCtx 
 * @param columns 
 * @param columnsMetadata 
 * @returns 
 */
function checkColumns(formCtx: Xrm.FormContext, columns?: StringPropertyObject, columnsMetadata?: ColumnTypePropertyObject) {
    if (columns == null) {
        return;
    }
    
    for (const columnKey in columns) {
        const columnValue = columns[columnKey];

        if (isNullOrEmpty(columnValue)) {
            throw new Error(`The column ${columnKey} is not set in configuration`);
        }

        const xrmAttr = formCtx.getAttribute(columnValue as string);

        if (xrmAttr == null) {
            throw new Error(`The column ${columnKey} / ${columnValue} is not on this form`);
        }
        
        if (columnsMetadata != null) {
            const xrmColumnType = convertToColumnType(xrmAttr.getAttributeType());
            const columnType = (columnsMetadata as ColumnTypePropertyObject)[columnKey];

            if (columnType !== xrmColumnType) {
                throw new Error(`The column type of ${columnValue} does not match. ${columnType} was expected but found ${xrmColumnType}.`);
            }
        }
    }
}

/**
 * Checks the consistency of the tab configuration.
 * @param formCtx 
 * @param tabs 
 * @returns 
 */
function checkTabs(formCtx: Xrm.FormContext, tabs: FormConfig["tabs"]) {
    if (tabs == null) {
        return;
    }

    for (const tabKey in tabs) {
        const tab = tabs[tabKey];
        if (isNullOrEmpty(tab)) {
            throw new Error(`The tab ${tabKey} is not set in configuration`);
        }

        if (formCtx.ui.tabs.get(tab as string) == null) {
            throw new Error(`The tab ${tabKey} / ${tab} is not on this form`);
        }
    }
}

/**
 * Checks that the configuration of a form feature is consistent.
 * @param feature
 * @param formCtx
 */
export function checkFormConfiguration(formCtx: Xrm.FormContext, config: FormConfig, columnsMetadata?: ColumnTypePropertyObject): void {
    if (config == null) {
        throw new Error("Configuration is null");
    }

    checkColumns(formCtx, config["columns"], columnsMetadata);
    checkTabs(formCtx, config["tabs"]);
}