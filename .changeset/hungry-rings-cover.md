---
"@primno/core": minor
---

Added support for providedIn in the Injectable decorator.
Allows to easily provide a service without having to add it in the "providers" property of a module or a component.

Enables tree shaking: the service will not be integrated in the build if it is not used.