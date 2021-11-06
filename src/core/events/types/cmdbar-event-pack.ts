import { EventType } from "../../../typing";
import { ButtonPressEventType, EnableRuleEventType, PopulateQueryEventType } from "./cmdbar-event-type";

export const cmdBarEventPack: EventType[] = [
    new ButtonPressEventType(),
    new EnableRuleEventType(),
    new PopulateQueryEventType()
];
