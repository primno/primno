import { ConstructorOrObject } from "../../typing/common";

export function resolveStorage(target: ConstructorOrObject): any {
    switch (typeof target) {
        case "object": return target.constructor;
        case "function": return target;
        default: throw new Error("Metadata storage can't be resolved. Unsupported target");
    }
}

export class MetadataStorage {
    private metadataKey: string;

    public constructor(private storage: any, shelf: string) {
        this.metadataKey = `primno:metadata-${shelf}`
    }

    public getData(): Record<string, any> {
        return Reflect.getMetadata(this.metadataKey, this.storage) ?? {};
    }

    private setData(data: Record<string, any>) {
        Reflect.defineMetadata(this.metadataKey, data, this.storage);
    }

    public getMetadata(key: string): any {
        return this.getData()[key];
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