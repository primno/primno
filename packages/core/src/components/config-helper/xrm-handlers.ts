import { StringPropertyObject } from "../../typing";

/** Proxy allowing shortcut access to the columns indicated in the configuration of the features. */
abstract class XrmHandler<T extends StringPropertyObject> implements ProxyHandler<T> {
    private _formCtx: Xrm.FormContext;

    protected get formCtx() {
        return this._formCtx;
    }

    constructor(formCtx: Xrm.FormContext) {
        this._formCtx = formCtx;
    }

    abstract get(target: T, prop: string, receiver: unknown): unknown;
}

/** Proxy returning the columns */
export class XrmColumnHandler<T extends StringPropertyObject> extends XrmHandler<T> {
    constructor(formCtx: Xrm.FormContext) {
        super(formCtx);
    }

    public get(target: T, prop: string): unknown {
        if (target == null || target[prop] == null) {
            return null;
        }

        return this.formCtx.getAttribute(target[prop] as string);
    }
}

/** Proxy returning the controls */
export class XrmControlHandler<T extends StringPropertyObject> extends XrmHandler<T> {
    constructor(formCtx: Xrm.FormContext) {
        super(formCtx);
    }

    public get(target: T, prop: string): unknown {
        return this.formCtx.getControl(target[prop] as string);
    }
}

/** Proxy returning the columns values */
export class XrmValueHandler<T extends StringPropertyObject> extends XrmHandler<T> {
    constructor(formCtx: Xrm.FormContext) {
        super(formCtx);
    }

    public get(target: T, prop: string): unknown {
        if (target == null || target[prop] == null) {
            return null;
        }

        const attribute = this.formCtx.getAttribute(target[prop] as string);
        return attribute.getValue();
    }
}

/** Proxy returning the tabs */
export class XrmTabHandler<T extends StringPropertyObject> extends XrmHandler<T> {
    constructor(formCtx: Xrm.FormContext) {
        super(formCtx);
    }

    public get(target: T, prop: string): unknown {
        return this.formCtx.ui.tabs.get(target[prop] as string);
    }
}