import { expect } from "chai";
import sinon from "sinon";
import { XrmMockGenerator } from "xrm-mock";
import { getFormContext, isUci } from "../../src/utils";

describe("Utils dataverse", () => {

    describe("IsUci", () => {
        it("must return false if not set", () => {
            const xrmFake = sinon.fake();
            (globalThis.Xrm as any) = xrmFake;
            expect(isUci()).to.equal(false);
        });
    
        it("must return true if set", () => {
            const isUciFake = sinon.stub().returns(true);
    
            (globalThis.Xrm as any) = {
                Internal: {
                    isUci: isUciFake
                }
            };
    
            expect(isUci()).to.equal(true);
        });
    });

    describe("getFormContext", () => {
        before("Initialize Xrm Mock", () => {
            XrmMockGenerator.initialise();
        });

        it("must return form context when form context is given", () => {
            const formCtx = XrmMockGenerator.getFormContext();
            expect(getFormContext(formCtx as any)).equal(formCtx);
        });

        it("must return null when form context is not given", () => {
            expect(getFormContext(null as any)).null;
            expect(getFormContext(undefined as any)).null;
        });
    });
})
