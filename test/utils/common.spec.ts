import { expect } from "chai";
import { isNullOrEmpty, isNullOrUndefined, isObject } from "../../src/utils/common";

describe("Utils common", () => {
    describe("isNullOrEmpty", () => {
        it("must return true if null or empty", () => {
            expect(isNullOrEmpty(<any>null)).true;
            expect(isNullOrEmpty(<any>undefined)).true;
            expect(isNullOrEmpty("")).true;
        });

        it("must return false if not null or empty", () => {
            expect(isNullOrEmpty("Text")).false;
        })
    });

    describe("isNullOrUndefined", () => {
        it("must return true if null or undefined", () => {
            expect(isNullOrUndefined(null)).true;
            expect(isNullOrUndefined(undefined)).true;
        });

        it("must return false if not null or undefined", () => {
            expect(isNullOrUndefined({})).false;
            expect(isNullOrUndefined("")).false;
            expect(isNullOrUndefined(true)).false;
        });
    });

    describe("isObject", () => {
        it("must return true if object", () => {
            expect(isObject({})).true;
        });

        it("must return false if not object", () => {
            expect(isObject(true)).false;
            expect(isObject(10)).false;
            expect(isObject(null)).false;
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
