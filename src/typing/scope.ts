export type PageType = "record" | "list";

export interface AppScopeConfig {
    id: string;
}

export interface FormScopeConfig {
    id?: string;
    name?: string;
}

export interface Scope {
    entityName: string;
    form?: FormScopeConfig;
    app?: AppScopeConfig;
    pageType?: PageType;
}