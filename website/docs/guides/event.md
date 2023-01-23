# Events

An event can be subscribed using decorators. It must be associated with a method that will be the event handler called when the event occurs.

There are two types of events, events with a target and events without a target. The target is a control, for example a column in a form or the name of a command to be executed on the command bar.

When the event handler is called, an argument is passed. It can be of a different type, depending on the event that occurred. For example, an `oncolumnchange` event will contain the context of the form on which it is executed, whereas the `oncommandinvoke` event will contain the associated grid control or form context.

## Form Load

The form load event is fired when a form is loaded and after a new record is created.
To subscribe to this event, use the `@MnOnFormLoad()` decorator.

Decorator signature:
```ts
@MnOnFormLoad()
```

Example:
```ts
@MnOnFormLoad()
public onFormLoad(eventArg: FormEventArgs) {}
```

:::warning
This event can't be automatically subscribed and must be manually registered in Power Apps / D365.
:::

## Column Change

The column change event is fired when:
- A column value has changed in a form and the focus is lost.
- A column value on the server are retrieved when the form is refreshed.

To subscribe to this event, use the `@MnOnColumnChange()` decorator.

Decorator signature:
```ts
@MnOnColumnChange(columnName: string)
```

Example with a column name:
```ts
@MnOnColumnChange('firstname')
public onFirstNameChange(eventArg: FormEventArgs) {}
```

Example with a column reference to component configuration:
```ts
@MnComponent()
class MyComponent implements Config {
    @MnConfig({
        customColumn: 'firstname'
    })
    config: {
        customColumn: string;
    };

    /**
     * Subscribe to the column change event of the column specified in the configuration.
     * Therefore subscribe to firstname column.
     */
    @MnOnColumnChange(cfg => cfg.customColumn)
    public onFirstNameChange(eventArg: FormEventArgs) {}
}
```