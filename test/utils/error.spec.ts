import { expect } from "chai";
import sinon from "sinon";
import { XrmMockGenerator } from "xrm-mock";
import * as dataverse from "../../src/utils/dataverse";
import { notifyCriticalError } from "../../src/utils/error";

describe("Utils Error", () => {
    before(() => {
        XrmMockGenerator.initialise();
    });

    describe("notifyCriticalError", () => {
        const message = "Test error message";
        const details = "Test details message";

        afterEach(() => {
            sinon.restore();
        });

        it("must call Xrm.Navigation.openAlertDialog", function () {
            sinon.stub(dataverse, "isUci").returns(false);

            const consoleErrorSpy = sinon.stub(console, "error");
            const openAlertDialogSpy = sinon.stub(Xrm.Navigation, "openAlertDialog");

            expect(notifyCriticalError(message)).to.not.throw;

            expect(consoleErrorSpy.calledOnce).to.be.true;
            expect(openAlertDialogSpy.calledWith({ text: message, title: "An error was occured" })).to.be.true;
        });

        it("must adds details", () => {
            sinon.stub(dataverse, "isUci").returns(false);
            const openAlertDialogSpy = sinon.stub(Xrm.Navigation, "openAlertDialog");
            const fullMessage = `${message}. Details: ${details}`;

            expect(notifyCriticalError(message, details)).to.not.throw;
            expect(openAlertDialogSpy.calledWith({ text: fullMessage, title: "An error was occured" })).to.be.true;
        });

        it("must call Xrm.Navigation.openErrorDialog", () => {
            sinon.stub(dataverse, "isUci").returns(true);
            const openErrorDialog = sinon.stub(Xrm.Navigation, "openErrorDialog");

            expect(notifyCriticalError(message, details)).to.not.throw;
            expect(openErrorDialog.calledWith({ message: message, details: details })).to.be.true;
        });
    })
})
