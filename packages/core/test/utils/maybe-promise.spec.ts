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
        
        expect(isPromise(result)).toBe(true);
        expect((await result)).toBe("ok");
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
        
        expect(isPromise(result)).toBe(true);
        expect(await result).toBe("ok");
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

        expect(isPromise(result)).toBe(false);
        expect(result).toBe("ok");
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

        expect(except).not.toBe(null);
        expect(except).toBe("error1");
        expect(result).toBe(undefined);
        expect(value).toBe("updated");
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
            expect(except).not.toBe(null);
            expect(except).toBe("error1");
            expect(result).toBe(undefined);
        });
    });
})
