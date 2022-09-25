import { inject } from "inversify";

export function Inject(serviceIdentifier: any) {
    return inject(serviceIdentifier);
}