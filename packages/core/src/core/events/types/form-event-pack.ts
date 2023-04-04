import { EventType } from "../../../typing";
import {
    DataLoadEventType,
    ColumnChangeEventType,
    FormLoadEventType,
    LookupTagClickEventType,
    PreProcessStatusChangeEventType,
    PreSearchEventType,
    PreStageChangeEventType,
    ProcessStatusChangeEventType,
    SaveEventType,
    StageChangeEventType,
    StageSelectedEventType,
    TabStateEventType,
    GridLoadEventType,
    PostSaveEventType,
    GridSaveEventType,
    GridRecordSelectEventType,
    GridChangeEventType
} from "./form-event-type";

export const formEventPack: EventType[] = [
    new FormLoadEventType(),
    new DataLoadEventType(),
    new SaveEventType(),
    new PostSaveEventType(),
    new ColumnChangeEventType(),
    new PreSearchEventType(),
    new LookupTagClickEventType(),
    new TabStateEventType(),
    new StageChangeEventType(),
    new ProcessStatusChangeEventType(),
    new PreProcessStatusChangeEventType(),
    new PreStageChangeEventType(),
    new StageSelectedEventType(),
    new GridLoadEventType(),
    new GridSaveEventType(),
    new GridRecordSelectEventType(),
    new GridChangeEventType()
];
