import { FluentEventRegister } from "..";
import { ComponentBase } from "../component-base";
import { PopulateQuery, PopulateQueryConfig, PopulateQueryEventArg } from "../../typing";

export abstract class PopulateQueryBase<TConfig extends PopulateQueryConfig = PopulateQueryConfig> extends ComponentBase<TConfig> implements PopulateQuery<TConfig> {
    public abstract populate(): string;

    public constructor(config: TConfig){
        super(config);
    }

    protected onPopulateMenu(eventArg: PopulateQueryEventArg): void {
        eventArg.commandProperties.PopulationXML = this.populate();
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public registerEvents(eventRegister: FluentEventRegister): void {
        eventRegister.withOnPopulateQuery(this.onPopulateMenu, this.config.populateQueryCommandId);
    }
}