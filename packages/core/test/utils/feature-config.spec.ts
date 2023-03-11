import { expect } from "chai";
import { XrmMockGenerator } from "xrm-mock";
import { checkFormConfiguration } from "../../src/utils";

describe("Utils Feature Config", () => {
    describe("checkFeatureConfiguration", () => {
        let formCtx: Xrm.FormContext;

        before(() => {
            XrmMockGenerator.initialise();
            formCtx = XrmMockGenerator.getFormContext();
        });

        it("must throw exception without config", () => {
            const throwError = "Configuration is null";
            expect(() => checkFormConfiguration(formCtx, <any>null)).to.throw(throwError);
            expect(() => checkFormConfiguration(formCtx, <any>undefined)).to.throw(throwError);
        });

        it("must not throw exception when column or tab is null", () => {
            expect(() => checkFormConfiguration(formCtx, {})).to.not.throw();
        });

        it("must throw exception when column or tab column is null", () => {
            expect(() => checkFormConfiguration(formCtx, { columns: { test: <any>null } })).to.throw("The column test is not set in configuration");
            expect(() => checkFormConfiguration(formCtx, { tabs: { test: <any>null } })).to.throw("The tab test is not set in configuration");
        });

        it("must throw exception when column or tab is not on form", () => {
            expect(() => checkFormConfiguration(formCtx, { columns: { accountNumber: "accountnumber" } })).to.throw("The column accountNumber / accountnumber is not on this form");
            expect(() => checkFormConfiguration(formCtx, { tabs: { general: "generalTab" } })).to.throw("The tab general / generalTab is not on this form");
        });

        it("must not throw exception when column or tab is on form", () => {
            XrmMockGenerator.Attribute.createString("nullvaluecolumn", <any>null);
            XrmMockGenerator.Attribute.createString("stringcolumn", "Text");
            XrmMockGenerator.Tab.createTab("generalTab", "General");
            XrmMockGenerator.Tab.createTab("mainTab");

            expect(() => checkFormConfiguration(formCtx, {
                columns:
                {
                    nullValueColumn: "nullvaluecolumn",
                    stringColumn: "stringcolumn"
                }
            })).to.not.throw();
            expect(() => checkFormConfiguration(formCtx, { tabs: { general: "generalTab", main: "mainTab" } })).to.not.throw();
        });
    });
})
