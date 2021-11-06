import { EventType } from "../../../typing";
import {
    DataLoadEventType,
    FieldChangeEventType,
    FormLoadEventType,
    LookupTagClickEventType,
    PreProcessStatusChangeEventType,
    PreSearchEventType,
    PreStageChangeEventType,
    ProcessStatusChangeEventType,
    SaveEventType,
    StageChangeEventType,
    StageSelectedEventType,
    TabStateEventType
} from "./form-event-type";

export const formEventPack: EventType[] = [
    new FormLoadEventType(),
    new DataLoadEventType(),
    new SaveEventType(),
    new FieldChangeEventType(),
    new PreSearchEventType(),
    new LookupTagClickEventType(),
    new TabStateEventType(),
    new StageChangeEventType(),
    new ProcessStatusChangeEventType(),
    new PreProcessStatusChangeEventType(),
    new PreStageChangeEventType(),
    new StageSelectedEventType(),
];
