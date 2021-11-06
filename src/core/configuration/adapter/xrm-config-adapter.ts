import { Configuration } from "..";
import { ImportResolverConfig } from "../../module/import-module-resolver";
import { ModuleResolverTypes } from "../configuration";
import { ConfigAdapter } from "./config-adapter";

const configEntityName = "mn_configuration";
const selectedFields = ["mn_moduleresolvertype", "mn_moduleresolverformat", "statecode"];

const moduleResolverTypeMap = new Map<number, ModuleResolverTypes>([
    [875990000, "import"]
]);

export class XrmConfigAdapter implements ConfigAdapter {
    public async getConfig(): Promise<Configuration> {
        const selectQuery = selectedFields.join(",");

        // TODO: Improve retrieve of only one record when applying filter
        const result = await Xrm.WebApi.retrieveMultipleRecords(configEntityName, `?$select=${selectQuery}&$filter=statecode eq 0`);

        const configs: Configuration[] = result.entities.map(cfg => {
            return {
                moduleResolverConfig: <ImportResolverConfig>{
                    type: moduleResolverTypeMap.get(cfg["mn_moduleresolvertype"]),
                    format: cfg["mn_moduleresolverformat"]
                }
            }
        });

        return configs[0];
    }
}