import { ConstructorOrObject, ModuleConstructor, ComponentConstructor, Component } from "../../typing";
import { ClassMetadata } from "../reflection/class";
import { ComponentConfigInternal } from "./component";
import { ModuleConfig } from "./module";

function isConstructorOrObject(value: ConstructorOrObject) {
    return typeof value === "function" || typeof value === "object";
}

/**
 * Gets all modules config from a module, imported modules included.
 * @param module Module
 * @returns All modules config
 */
export function getAllImportedModuleConfig(module: ModuleConstructor): ModuleConfig[] {
    const moduleConfig = getModuleConfig(module);

    if (moduleConfig == null) {
        return [];
    }

    if (moduleConfig.imports == null) {
        return [moduleConfig];
    }

    const subModules = Array.isArray(moduleConfig.imports) ? moduleConfig.imports : [moduleConfig?.imports];

    return [moduleConfig, ...subModules.flatMap(m => getAllImportedModuleConfig(m))];
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