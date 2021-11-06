import { AppScopeConfig, FormScopeConfig, PageType, Scope } from "../../../typing";
import { isNullOrEmpty, isNullOrUndefined, isSameId } from "../../../utils";

export abstract class ScopeBase implements Scope {
    protected constructor(entityName: string) {
        this._entityName = entityName;
    }

    private isSameForm(first?: FormScopeConfig, second?: FormScopeConfig): boolean {
        return isNullOrUndefined(first) ||
            (!isNullOrUndefined(second) &&
            (!isNullOrUndefined(first.id) && !isNullOrUndefined(second.id) && isSameId(first.id, second.id) || first.name == second.name));
    }

    private isEqualsOrNull(first: string | undefined, second: string | undefined) {
        return isNullOrEmpty(first) || second == second;
    }

    public isInScope(scope: ScopeBase): boolean {
        return this.isEqualsOrNull(this.entityName, scope.entityName) &&
            this.isSameForm(this.form, scope.form) &&
            this.isEqualsOrNull(this.app?.id, scope.app?.id) &&
            this.isEqualsOrNull(this.pageType, scope.pageType);
    }

    public get entityName(): string {
        return this._entityName;
    }

    public set entityName(value: string) {
        this._entityName = value;
    }

    public set app(value: AppScopeConfig | undefined) {
        this._app = value;
    }

    public get app(): AppScopeConfig | undefined {
        return this._app;
    }

    public set pageType(value: PageType | undefined) {
        this._pageType = value;
    }

    public get pageType(): PageType | undefined {
        return this._pageType;
    }

    public get form(): FormScopeConfig | undefined {
        return this._form;
    }

    protected set form(value: FormScopeConfig | undefined) {
        this._form = value;
    }

    private _entityName: string;
    private _form?: FormScopeConfig;
    private _app?: AppScopeConfig;
    private _pageType?: PageType;
}

