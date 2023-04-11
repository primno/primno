import { ClassMetadata } from "./class";
import { MetadataAccessor } from "./interface";
import { ParameterMetadata } from "./parameter";
import { PropertyMetadata } from "./property";

/**
 * Helper class to access metadata from a decorator.
 */
 export class MetadataDecoratorHelper implements MetadataAccessor {
    private storage: MetadataAccessor;

    public constructor(
        target: any,
        key?: string | symbol,
        indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {

        if (!key && !indexOrPropertyDescriptor) {
            this.storage = new ClassMetadata(target);
        }
        else if (typeof indexOrPropertyDescriptor === "number") {
            this.storage = new ParameterMetadata(target, indexOrPropertyDescriptor);
        }
        else if (typeof key === "string") {
            this.storage = new PropertyMetadata(target, key);
        }
        else {
            throw new Error("Unsupported target");
        }
    }

    public getMetadata(key: string): any {
        return this.storage.getMetadata(key);
    }

    public setMetadata(key: string, value: any) {
        this.storage.setMetadata(key, value);
    }

    public hasMetadata(key: string): boolean {
        return this.storage.getMetadata(key) !== undefined;
    }
}