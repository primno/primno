import { ModuleResolver } from "./module-resolver";
import { Module } from "../../typing";

export class EmbeddedModuleResolver implements ModuleResolver {
    constructor(private module: Module) {}

    public resolve() {
        return this.module;
    }
}