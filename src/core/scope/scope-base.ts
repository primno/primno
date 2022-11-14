import { AppScopeConfig, FormScopeConfig, PageType, Scope } from "../../typing";
import { isNullOrEmpty, isSameId } from "../../utils";

export abstract class ScopeBase implements Scope {
    private scope: Scope;

    protected constructor(scope: Scope) {
        this.scope = scope;
    }

    private isSameForm(first?: FormScopeConfig, second?: FormScopeConfig): boolean {
        return first == null ||
            (second != null &&
            (first.id != null && second.id != null && isSameId(first.id, second.id) || first.name == second.name));
    }

    private isEqualsOrNull(first: string | undefined, second: string | undefined) {
        return isNullOrEmpty(first) || second == second;
    }

    public isInScope(scope: ScopeBase): boolean {
        // TODO: Complete
        //this.entityNames.every(e => this.isEqualsOrNull(e, scope.entityName)) &&
        return this.isSameForm(this.form, scope.form) &&
            this.isEqualsOrNull(this.app?.id, scope.app?.id) &&
            this.isEqualsOrNull(this.pageType, scope.pageType);
    }

    private get entityNames(): string[] {
        return [...this.entityName ?? []];
    }

    public get entityName(): string | string[] | undefined {
        return this.scope.entityName;
    }

    public set entityName(value: string | string[] | undefined) {
        this.scope.entityName = value;
    }

    public set app(value: AppScopeConfig | undefined) {
        this.scope.app = value;
    }

    public get app(): AppScopeConfig | undefined {
        return this.scope.app;
    }

    public set pageType(value: PageType) {
        this.scope.pageType = value;
    }

    public get pageType(): PageType {
        return this.scope.pageType;
    }

    public get form(): FormScopeConfig | undefined {
        return this.scope.form;
    }

    protected set form(value: FormScopeConfig | undefined) {
        this.scope.form = value;
    }
}

