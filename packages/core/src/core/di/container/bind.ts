interface ValueBind {
    token: any;
    type: "value";
    use: any;
}

interface ClassBind {
    token: any;
    type: "class";
    use: any;
}

interface FactoryBind {
    token: any;
    type: "factory";
    use: any;
}

export type Bind = ValueBind | ClassBind | FactoryBind;