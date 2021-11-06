import { Component } from "./component";

/**
 * Domain of components.
 * Specifies the components that must be executed for a given context (Grid, Form).
  */
export interface Domain {
    components: Component[];
}
