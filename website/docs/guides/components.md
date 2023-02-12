# Component

A component is a behavior that can be applied in a form or a grid.
There are 2 types of components, components that apply to a set of records and components that apply to a single record.
This implies that a component targeting a form, and therefore a single record, cannot be applied to a grid or sub-grid.

# Scope

# Sub-component
A sub-component is a component encapsulated in another one.
It can be enabled or disabled using the enable /disable method.
When a component is deactivated it is destroyed and the subscribed events are automatically unsubscribed.
