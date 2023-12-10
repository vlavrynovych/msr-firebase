import {ISchemaVersion} from "migration-script-runner";
import {MigrationScriptService} from "./MigrationScriptService";

export class SchemaVersionService implements ISchemaVersion {

    constructor(public migrations: MigrationScriptService) {}

    async createTable(tableName: string): Promise<boolean> {
        console.log(tableName)
        return true;
    }

    async isInitialized(tableName: string): Promise<boolean> {
        console.log(tableName)
        return true;
    }

    async validateTable(tableName: string): Promise<boolean> {
        console.log(tableName)
        return true;
    }
}