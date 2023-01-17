import { EventType } from "../../../typing";
import { CommandInvokeEventType, EnableRuleEventType, PopulateQueryEventType } from "./cmdbar-event-type";

export const cmdBarEventPack: EventType[] = [
    new CommandInvokeEventType(),
    new EnableRuleEventType(),
    new PopulateQueryEventType()
];
