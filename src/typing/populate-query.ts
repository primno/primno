import { Component, ComponentConfig } from "./component";

export interface PopulateQueryConfig extends ComponentConfig {
    populateQueryCommandId: string;
}

// TODO: Usefull ?
export interface PopulateQuery<TConfig extends PopulateQueryConfig = PopulateQueryConfig> extends Component<TConfig> {
    populate(): string;
}