export enum PageType { 
    record = "record",
    list = "list"
}

export interface AppScopeConfig {
    id: string;
}

export interface FormScopeConfig {
    id?: string;
    /**
     * @deprecated Use id instead
     */
    name?: string;
}

interface ScopeBase {
    pageType: PageType;
    table?: string | string[];
    app?: AppScopeConfig;
}

export interface RecordScope extends ScopeBase {
    pageType: PageType.record;
    form?: FormScopeConfig;
}

export interface ListScope extends ScopeBase {
    pageType: PageType.list;
}

export type Scope = RecordScope | ListScope;
