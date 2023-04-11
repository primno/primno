import * as commandBarEvents from './command-bar';
import * as formEvents from './form';

const eventTypes = [
    ...Object.values(commandBarEvents),
    ...Object.values(formEvents)
];

export const eventTypesInstances = eventTypes.map(et => new et());