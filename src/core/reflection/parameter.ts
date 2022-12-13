import { ConstructorOrObject } from "../../typing";
import { MetadataAccessor } from "./interface";
import { MetadataStorage } from "./storage";

export class ParameterMetadata implements MetadataAccessor {
    private storage: MetadataStorage;
    private parameterKey: string;

    public constructor(target: ConstructorOrObject, index: number) {
        this.storage = new MetadataStorage(target.constructor, "parameter");
        this.parameterKey = index.toString();
    }

    private getData() {
        return this.storage.getMetadata(this.parameterKey) ?? {};
    }

    private setData(data: Record<string, any>) {
        this.storage.setMetadata(this.parameterKey, data);
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
