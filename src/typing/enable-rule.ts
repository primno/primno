import { Component, ComponentConfig } from "./component";
import { EventArg } from "./events";

export interface EnableRuleConfig extends ComponentConfig {
    // TODO: Change config location ?
    rule: string;
}

export interface EnableRule<TConfig extends EnableRuleConfig = EnableRuleConfig> extends Component<TConfig> {
    // TODO: Replace event arg type
    isEnabled(eventArg: EventArg) : boolean;
}