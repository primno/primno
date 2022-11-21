import { ConstructorOrObject, ModuleConstructor, ComponentConstructor, Component } from "../../typing";
import { ClassMetadata } from "../reflection/class";
import { ComponentConfigInternal } from "./component";
import { ModuleConfig } from "./module";

function isConstructorOrObject(value: ConstructorOrObject) {
    return typeof value === "function" || typeof value === "object";
}

export function getModuleConfig(module: ModuleConstructor) {
    if (!isConstructorOrObject(module)) {
        return undefined;
    }

    const classMetadata = new ClassMetadata(module);
    return classMetadata.getMetadata("module") as ModuleConfig;
}

export function getComponentConfig(componentType: ComponentConstructor) {
    if (!isConstructorOrObject(componentType)) {
        return undefined;
    }

    const classMetadata = new ClassMetadata(componentType);
    return classMetadata.getMetadata("component") as ComponentConfigInternal;
}

export function isComponent(componentType: ComponentConstructor | Component) {
    if (!isConstructorOrObject(componentType)) {
        return false;
    }

    const classMetadata = new ClassMetadata(componentType);
    return classMetadata.hasMetadata("component");
}

export function isModule(moduleType: ModuleConstructor) {
    if (!isConstructorOrObject(moduleType)) {
        return false;
    }

    const classMetadata = new ClassMetadata(moduleType);
    return classMetadata.hasMetadata("module");
}