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
 * Decorator that mark a property as a sub component.
 * The sub component is a component that is used inside another component.
 * The sub component property must be of type {@link ComponentActivator} to be able to enable/disable the sub component.
 * @param config Configuration of the sub component. Specify the component and the optional input. See {@link SubComponentConfig}
 * @category Component
 * @example Add 2 phone call components to a record page linked to the telephone1 and telephone2 columns.
 * ```ts
 * @MnComponent({
 *    scope: {
 *       pageType: PageType.record,
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
 *       pageType: PageType.record,
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
 *    phoneCall1Component: ComponentActivator<PhoneCallComponent>;
 * 
 *    @MnSubComponent({
 *       component: PhoneCallComponent,
 *       input: {
 *          phone: "telephone2",
 *          phoneCommand: "callPhone2"
 *       }
 *    })
 *    phoneCall2Component: ComponentActivator<PhoneCallComponent>;
 * }
 * ```
 */
export function MnSubComponent<T extends ComponentConstructor>(config: SubComponentConfig<T>) {
    return function (target: DecoratorTarget, targetKey?: string | symbol, indexOrPropertyDescriptor?: number | TypedPropertyDescriptor<unknown>) {  
        const primnoTarget = new MetadataDecoratorHelper(target, targetKey, indexOrPropertyDescriptor);
        primnoTarget.setMetadata("subcomponent", config);
    };
}
