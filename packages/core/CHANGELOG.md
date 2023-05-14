# @primno/core

## 0.8.0

### Minor Changes

- 3580fa6: Added support for providedIn in the Injectable decorator.
  Allows to easily provide a service without having to add it in the "providers" property of a module or a component.

  Enables tree shaking: the service will not be integrated in the build if it is not used.

### Patch Changes

- 5cb0e16: Specifying the component type in the MnConfig decorator is now optional
