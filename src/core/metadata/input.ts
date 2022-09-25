import { Inject } from "../di/inject";

/**
 * Décorateur marquant cette propriété comme affecté par le composant parent.
 * @param importFromParent Importer à partir du parent ?
 * @returns 
 */
 export function MnInput(importFromParent = true) {
    if (importFromParent) {
        return Inject("input");
    }
}