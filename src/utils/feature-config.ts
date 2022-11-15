import { FieldType, FieldTypePropertyObject, FormConfig, StringPropertyObject } from "../typing";
import { isNullOrEmpty } from "./common";

/**
 * Converts Dataverse field type to Primno field type.
 * @param xrmAttributeType 
 * @returns 
 */
function convertToFieldType(xrmAttributeType: Xrm.Attributes.AttributeType): FieldType {
    switch (xrmAttributeType){
        case "boolean": return FieldType.boolean;
        case "datetime": return FieldType.datetime;
        case "decimal":
        case "double":   
        case "integer": return FieldType.number;
        case "lookup":  return FieldType.lookup;
        case "memo": 
        case "string": return FieldType.string;
        case "money": return FieldType.number;
        case "optionset": return FieldType.optionset;
        default: throw new Error("Unknow field type");
    }
}

/**
 * Checks the consistency of a field configuration. Check field types if fieldMetadata is given.
 * @param formCtx 
 * @param fields 
 * @param fieldsMetadata 
 * @returns 
 */
function checkFields(formCtx: Xrm.FormContext, fields?: StringPropertyObject, fieldsMetadata?: FieldTypePropertyObject) {
    if (fields == null) {
        return;
    }
    
    for (const fieldKey in fields) {
        const fieldValue = fields[fieldKey];

        if (isNullOrEmpty(fieldValue)) {
            throw new Error(`The field ${fieldKey} is not set in configuration`);
        }

        const xrmAttr = formCtx.getAttribute(fieldValue as string);

        if (xrmAttr == null) {
            throw new Error(`The field ${fieldKey} / ${fieldValue} is not on this form`);
        }
        
        if (fieldsMetadata != null) {
            const xrmFieldType = convertToFieldType(xrmAttr.getAttributeType());
            const fieldType = (fieldsMetadata as FieldTypePropertyObject)[fieldKey];

            if (fieldType !== xrmFieldType) {
                throw new Error(`The field type of ${fieldValue} does not match. ${fieldType} was expected but found ${xrmFieldType}.`);
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
export function checkFormConfiguration(formCtx: Xrm.FormContext, config: FormConfig, fieldsMetadata?: FieldTypePropertyObject): void {
    if (config == null) {
        throw new Error("Configuration is null");
    }

    checkFields(formCtx, config["fields"], fieldsMetadata);
    checkTabs(formCtx, config["tabs"]);
}