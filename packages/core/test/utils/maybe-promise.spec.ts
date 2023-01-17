import { expect } from "chai";
import { isPromise, MaybePromise } from "../../src/utils";

describe("Utils MaybePromise", () => {
    it("must return promise", async () => {
        const result = MaybePromise.new(() => true)
        .then(async (value) => {
            if (value === true)
                return "ok";
            else
                return "ko"
        })
        .done();
        expect(isPromise(result));
        expect((await result) == "ok");
    });

    it("must return promise 2", async () => {
        const result = MaybePromise.new(async () => true)
        .then((value) => {
            if (value === true)
                return "ok";
            else
                return "ko"
        })
        .done();
        
        expect(isPromise(result)).to.be.true;
        expect(await result).to.be.equal("ok");
    });

    it("must not return promise", () => {
        const result = MaybePromise.new(() => true)
        .then((value: boolean) => {
            if (value === true)
                return "ok";
            else
                return "ko"
        })
        .done();

        expect(isPromise(result)).to.be.false;
        expect(result).to.be.equal("ok");
    });

    it("must throw sync 1", () => {
        let except: any = null;
        let value = "initial";

        const result = MaybePromise.new(() => { value = "updated"; })
        .then(() => { throw "error1" })
        .then(() => except = null)
        .then(() => { throw "error2" })
        .catch((e) => except = e)
        .done();

        expect(except).to.be.not.null;
        expect(except).to.be.equal("error1");
        expect(result).to.be.undefined;
        expect(value).to.be.equal("updated");
    });

    it("must throw async 1", async (): Promise<void> => {
        let except: any = null;
        let value = "initial";

        return MaybePromise.new(async () => { value = "updated"; })
        .then(() => { throw "error1" })
        .then(() => except = null)
        .then(() => { throw "error2"; })
        .catch((e) => { except = e; })
        .done()
        .then((result) => {
            expect(except).to.be.not.null;
            expect(except).to.be.equal("error1");
            expect(result).to.be.undefined;
        });
    });
})
