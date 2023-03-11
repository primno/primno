export interface MetadataAccessor {
    getMetadata(key: string): any;
    setMetadata(key: string, value: any): void;
    hasMetadata(key: string): boolean;
}