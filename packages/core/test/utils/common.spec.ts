import { isNullOrEmpty, isObject } from "../../src/utils/common";

describe("Utils common", () => {
    describe("isNullOrEmpty", () => {
        it("must return true if null or empty", () => {
            expect(isNullOrEmpty(<any>null)).toBe(true);
            expect(isNullOrEmpty(<any>undefined)).toBe(true);
            expect(isNullOrEmpty("")).toBe(true);
        });

        it("must return false if not null or empty", () => {
            expect(isNullOrEmpty("Text")).toBe(false);
        })
    });

    describe("isObject", () => {
        it("must return true if object", () => {
            expect(isObject({})).toBe(true);
        });

        it("must return false if not object", () => {
            expect(isObject(true)).toBe(false);
            expect(isObject(10)).toBe(false);
            expect(isObject(null)).toBe(false);
        });
    });

    /*describe("mergeDeep", () => {
        it("must return copy from multiples sources", () => {
            const target = { key1: "val1" };
            const source1 = { key2: "val2" };
            const source2 = { key3: "val3" };

            const expected = { key1: "val1", key2: "val2", key3: "val3" };

            expect(mergeDeep(target, source1, source2)).to.deep.equal(expected);
        });
    });*/
})
