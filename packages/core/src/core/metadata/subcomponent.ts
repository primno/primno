import { DecoratorTarget } from "inversify/lib/annotation/decorator_utils";
import { ComponentConstructor, InputMapper, InputOf } from "../../typing";
import { Input } from "../component/interface";
import { MetadataDecoratorHelper } from "../reflection/decorator-helper";

/**
 * Sub component configuration without input.
 * @category Component
 */
interface SubComponentConfigNone<T> {
    /**
     * Component type.
     */
     component: T;
     /**
      * Default state of the component.
      * @default true
      */
     enabled?: boolean;
}

/**
 * Sub component configuration with input.
 * @category Component
 */
interface SubComponentConfigInput<T extends ComponentConstructor = ComponentConstructor> extends SubComponentConfigNone<T> {
     /**
     * Input value or callback function that returns the input value from the component configuration.
     */
    input: InputOf<InstanceType<T>> | InputMapper<InstanceType<T>>;
}

/**
 * Sub component configuration.
 * @category Component
 * @typeparam T Component type
 */
export type SubComponentConfig<T extends ComponentConstructor = ComponentConstructor> = InstanceType<T> extends Input ? SubComponentConfigInput<T> : SubComponentConfigNone<T>;

/**
 * Decorator that mark a property as a sub-component.
 * 
 * A sub-component is a component that is used inside another component. It provides a way to split a component into smaller components by doing composition.
 * 
 * The sub-component property must be of type {@link SubComponent} to be able to enable/disable the sub component.
 * @param config Configuration of the sub component. Specify the component and the optional input. See {@link SubComponentConfig}
 * @category Component
 * @example Add 2 phone call components to a record page linked to the telephone1 and telephone2 columns.
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *    }
 * })
 * export class PhoneCallComponent implements Input, Config {
 *    @MnInput()
 *    input: {
 *      phoneColumn: string;
 *      phoneCommand: string;
 *    }
 * 
 *    @MnConfig(i => i)
 *    config: {
 *       phoneColumn: string;
 *       phoneCommand: string;
 *    }
 * 
 *    @MnOnCommandInvoke(c => c.phoneCommand)
 *    onCall(eventArg: CommandBarEventArgs) {
 *      const phoneAttr = eventArg.selectedRecord.getAttribute(this.config.phoneColumn);
 *      const phone = phoneAttr.getValue();
 *      Xrm.Navigation.openUrl({ url: `tel:${phone}` });
 *    }
 * }
 * 
 * @MnComponent({
 *    scope: {
 *       pageType: "record",
 *       entityName: "contact"
 *    }
 * })
 * export class AppComponent {
 *    @MnSubComponent({
 *       component: PhoneCallComponent,
 *       input: {
 *          phone: "telephone1",
 *          phoneCommand: "callPhone1"
 *       }
 *    })
 *    phoneCall1Component: SubComponent<PhoneCallComponent>;
 * 
 *    @MnSubComponent({
 *       component: PhoneCallComponent,
 *       input: {
 *          phone: "telephone2",
 *          phoneCommand: "callPhone2"
 *       }
 *    })
 *    phoneCall2Component: SubComponent<PhoneCallComponent>;
 * }
 * ```
 * @example Transmits the input from the parent component to the sub component.
 * Uses {@link ConfigOf} to get the type of the parent component configuration during transmission.
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: "record"
 *    }
 * })
 * class ParentComponent implements Config {
 *    @MnConfig({
 *       value1: "hello",
 *       value2: 123
 *    })
 *    config: {
 *       value1: string;
 *       value2: number;
 *    }
 *    
 *    @MnSubComponent({
 *       component: ChildComponent,
 *       input: (c: ConfigOf<ParentComponent> => { text: c.value1 })
 *    })
 *    childComponent: SubComponent<ChildComponent>;
 * }
 * 
 * @MnComponent({
 *    scope: {
 *       pageType: "record"
 *    }
 * })
 * class ChildComponent implements Input {
 *    @MnInput()
 *    input: {
 *       text: string;
 *    }
 * ```
 */
export function MnSubComponent<T extends ComponentConstructor>(config: SubComponentConfig<T>) {
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {  
        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("subcomponent", config);
    };
}
