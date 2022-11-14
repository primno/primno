export type PageType = "entityrecord" | "entitylist";

export interface AppScopeConfig {
    id: string;
}

export interface FormScopeConfig {
    id?: string;
    name?: string;
}

export interface Scope {
    pageType: PageType;
    entityName?: string | string[];
    form?: FormScopeConfig;
    app?: AppScopeConfig;
}