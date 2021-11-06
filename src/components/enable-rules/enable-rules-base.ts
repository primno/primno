import { FluentEventRegister } from "..";
import { EnableRuleConfig, EnableRule } from "../../typing";
import { ComponentBase } from "../component-base";
import { EventArg } from "../../typing";

export abstract class EnableRuleBase<TConfig extends EnableRuleConfig = EnableRuleConfig> extends ComponentBase<TConfig> implements EnableRule<TConfig> {
    public abstract isEnabled(eventArg: EventArg): boolean;

    public constructor(config: TConfig){
        super(config);
    }

    public registerEvents(eventRegister: FluentEventRegister): void {
        eventRegister.withOnEnableRule(this.isEnabled, this.config.rule);
    }
}