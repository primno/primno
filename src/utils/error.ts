import { Component, Feature } from "../typing";
import { isNullOrEmpty } from "./common";
import { isUci } from "./dataverse";

/**
 * Notifies that a critical error has occurred.
 * @param text Error message.
 */
export function notifyCriticalError(text: string, details?: string): void {
    console.error(`Critical error: ${text}. Details: ${details}`);

    if (isUci()) {
        Xrm.Navigation.openErrorDialog({ message: text, details: details });
    }
    else {
        let fullText = text;
        if (isNullOrEmpty(details) === false) {
            fullText = `${text}. Details: ${details}`;
        }

        Xrm.Navigation.openAlertDialog({ text: fullText, title: "An error was occured" }, { width: 600, height: 300 });
    }
}

/**
 * Notifies that a critical error has occurred in a feature.
 * @param component Feature
 * @param errorDetail Error message
 */
export function notifyCriticalFeatureError(component: Component, errorDetail: string): void {
    notifyCriticalError(`Feature error ${component.name}: ${errorDetail}.`);
}

/**
 * Notifies that a config error has occurred in a feature.
 * @param feature Feature
 * @param errorDetail Error message
 */
export function notifyFeatureConfigError(feature: Feature, errorDetail: string): void {
    notifyCriticalError(`The component configuration ${feature.name} is invalid: ${errorDetail}.`);
}