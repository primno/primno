export type PageType = "entityrecord" | "entitylist";

export interface AppScopeConfig {
    id: string;
}

export interface FormScopeConfig {
    id?: string;
    name?: string;
}

interface ScopeBase {
    pageType: PageType;
    entityName?: string | string[];
    app?: AppScopeConfig;
}

export interface RecordScope extends ScopeBase {
    pageType: "entityrecord";
    form?: FormScopeConfig;
}

export interface ListScope extends ScopeBase {
    pageType: "entitylist";
}

export type Scope = RecordScope | ListScope;
