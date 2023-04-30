import { MetadataAccessor } from "./interface";
import { MetadataStorage, resolveStorage } from "./storage";

// Global metadata is stored in the Reflect object itself.
const globalTarget = Reflect;

/**
 * Provides access to global metadata.
 * A global metadata is not bound to a specific type or object.
 */
export class GlobalMetadata implements MetadataAccessor {
    private storage: MetadataStorage;

    public constructor() {
        this.storage = new MetadataStorage(resolveStorage(globalTarget));
    }

    private getData() {
        return this.storage.getMetadata("global") ?? {};
    }

    private setData(data: Record<string, any>) {
        this.storage.setMetadata("global", data);
    }

    public getMetadata<T = any>(key: string): T {
        return this.getData()[key] as T;
    }

    public setMetadata(key: string, value: any) {
        const data = this.getData();
        data[key] = value;
        this.setData(data);
    }

    public hasMetadata(key: string): boolean {
        return this.getMetadata(key) !== undefined;
    }
}