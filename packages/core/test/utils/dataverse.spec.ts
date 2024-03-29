import { XrmMockGenerator } from "xrm-mock";
import { getFormContext } from "../../src/utils";

describe("Utils dataverse", () => {

    // TODO: Review
    // describe("IsUci", () => {
    //     it("must return false if not set", () => {
    //         const xrmFake = sinon.fake();
    //         (globalThis.Xrm as any) = xrmFake;
    //         expect(isUci()).to.be.false;
    //     });
    
    //     it("must return true if set", () => {
    //         const isUciFake = sinon.stub().returns(true);
    
    //         (globalThis.Xrm as any) = {
    //             Internal: {
    //                 isUci: isUciFake
    //             }
    //         };
    
    //         expect(isUci()).to.be.true;
    //     });
    // });

    describe("getFormContext", () => {
        beforeAll(() => {
            XrmMockGenerator.initialise();
        });

        it("must return form context when form context is given", () => {
            const formCtx = XrmMockGenerator.getFormContext();
            expect(getFormContext(formCtx as any)).toBe(formCtx);
        });

        it("must return null when form context is not given", () => {
            expect(getFormContext(null as any)).toBeNull();
            expect(getFormContext(undefined as any)).toBeNull();
        });
    });
})
