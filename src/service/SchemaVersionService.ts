import {ISchemaVersion} from "migration-script-runner";
import {MigrationScriptService} from "./MigrationScriptService";
import {AppConfig} from "../model";

export class SchemaVersionService implements ISchemaVersion {

    constructor(public migrations: MigrationScriptService,
                private cfg:AppConfig) {}

    async createTable(tableName: string): Promise<boolean> {
        const node = this.cfg.buildPath(tableName)
        await this.migrations.db.ref(node).set({})
        return true;
    }

    async isInitialized(tableName: string): Promise<boolean> {
        const dataSnapshot = await this.migrations.getSnapshot(this.cfg.buildPath(tableName));
        return dataSnapshot.exists()
    }

    async validateTable(tableName: string): Promise<boolean> {
        console.log(tableName)
        return true;
    }
}