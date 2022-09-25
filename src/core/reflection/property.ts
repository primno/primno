import { ConstructorOrObject } from "../../typing/common";
import { MetadataAccessor } from "./interface";
import { MetadataStorage, resolveStorage } from "./storage";

export class PropertyMetadata implements MetadataAccessor {
    private storage: MetadataStorage;
    private _propertyKey: string;

    public get propertyKey() {
        return this._propertyKey;
    }

    public constructor(target: ConstructorOrObject, name: string /*| symbol*/) {
        this.storage = new MetadataStorage(resolveStorage(target), "property");
        this._propertyKey = name;
    }

    private getData() {
        return this.storage.getMetadata(this.propertyKey) ?? {};
    }

    private setData(data: Record<string, any>) {
        this.storage.setMetadata(this.propertyKey, data);
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

    /**
     * Obtain the properties metadata of a type or object.
     * @param target Constructor or object
     * @returns 
     */
    public static getPropertiesMetadata(target: ConstructorOrObject): PropertyMetadata[] {
        const propStorage = new MetadataStorage(resolveStorage(target), "property");

        return Object.keys(propStorage.getData())
            .map(k => new PropertyMetadata(target, k));
    }
}