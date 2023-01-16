# Events

An event can be subscribed using decorators. It must be associated with a method that will be the event handler called when the event occurs.

There are two types of events, events with a target and events without a target. The target is a control, for example a field in a form or the name of a command to be executed on the command bar.

When the event handler is called, an argument is passed. It can be of a different type, depending on the event that occurred. For example, an "onfieldchange" event will contain the context of the form on which it is executed, whereas the "oncommandinvoke" event will contain the associated grid control or form context.