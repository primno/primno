/**
 * Page type.
 * @category Component
 */
export enum PageType { 
    record = "record",
    list = "list"
}

/**
 * App scope configuration.
 * @category Component
 */
export interface AppScopeConfig {
    id: string;
}

/**
 * Form scope configuration.
 * @category Component
 */
export interface FormScopeConfig {
    id?: string;
    /**
     * @deprecated Use id instead
     */
    name?: string;
}

/**
 * Base scope.
 * @category Component
 */
interface ScopeBase {
    pageType: PageType;
    table?: string | string[];
    app?: AppScopeConfig;
}

/**
 * Scope for record page.
 * @category Component
 */
export interface RecordScope extends ScopeBase {
    pageType: PageType.record;
    form?: FormScopeConfig;
}

/**
 * Scope for list page.
 * @category Component
 */
export interface ListScope extends ScopeBase {
    pageType: PageType.list;
}

/**
 * Component scope.
 * Define where the component is loaded.
 * @category Component
 */
export type Scope = RecordScope | ListScope;
