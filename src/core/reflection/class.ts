import { ConstructorOrObject } from "../../typing/common";
import { MetadataAccessor } from "./interface";
import { MetadataStorage, resolveStorage } from "./storage";

export class ClassMetadata implements MetadataAccessor {
    private storage: MetadataStorage;

    public constructor(target: ConstructorOrObject) {
        this.storage = new MetadataStorage(resolveStorage(target), "class");
    }

    public getMetadata(key: string) {
        return this.storage.getMetadata(key);
    }

    public setMetadata(key: string, value: any): void {
        this.storage.setMetadata(key, value);
    }

    public hasMetadata(key: string): boolean {
        return this.getMetadata(key) !== null;
    }
}