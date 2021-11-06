import { expect } from "chai";
import { isPromise, MaybePromise } from "../../src/utils";

describe("Utils MaybePromise", () => {
    it("must return promise", async () => {
        const result = new MaybePromise(() => true)
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

    it("must not return promise", () => {
        const result = new MaybePromise(() => true)
        .then((value: boolean) => {
            if (value === true)
                return "ok";
            else
                return "ko"
        })
        .done();

        expect(isPromise(result) == false);
        expect(result === "ok");
    });
})
